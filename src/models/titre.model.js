const sql = require("../config/db.js");

class Titre {
    constructor() {
        this.id = Titre.id;
        this.titre = Titre.titre;
    }

    static titrePagination = (page, show_type) => {
        return new Promise((resolve, reject) => {
            const titreParPage = 10;
            const decalage = (page - 1) * titreParPage;

            let requete = 'SELECT show_id, title FROM netflix_titles';
            let requeteCount = 'SELECT COUNT(*) as total FROM netflix_titles';

            const parametres = [];

            if (show_type) {
                requete += ' WHERE show_type = ?';
                requeteCount += ' WHERE show_type = ?';
                parametres.push(show_type);
            }

            requete += ` LIMIT ?, ?`;
            parametres.push(decalage, titreParPage);

            sql.query(requete, parametres, (erreur, resultat) => {
                if (erreur) {
                    reject(erreur);
                } else {
                    sql.query(requeteCount, parametres, (erreurComptage, resultatComptage) => {
                        if (erreurComptage) {
                            reject(erreurComptage);
                        } else {

                            const totalNombreTitre = resultatComptage[0].total;
                            const totalPage = Math.ceil(totalNombreTitre / titreParPage);

                            if (page + 1 > totalPage){
                                page = null;
                            }
                            else {
                                page = page + 1;
                            }
                            resolve({
                                titres: resultat,
                                "filtre": show_type,
                                "page": page - 1,
                                "url_page_suivante": `/api/titres/${show_type}?page=${page}`
                            });
                        }
                    });
                }
            });
        });
    };
}

module.exports = Titre;