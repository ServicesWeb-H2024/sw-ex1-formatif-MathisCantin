const Titre = require("../models/titre.model");

exports.titrePagination = (req, res) => {
    const page = Number(req.query.page) || 1;
    const show_type = req.params.show_type;

    Titre.titrePagination(page, show_type)
        .then((result) => {
            const { titres, filtre, page, url_page_suivante } = result;

            res.status(200).send({
                titres,
                filtre: filtre || '',
                page,
                url_page_suivante,
            });
        })
        .catch((erreur) => {
            console.error('Erreur : ', erreur);
            res.status(400).send({
                erreur: "Echec lors de la récupération des titres",
            });
        });
};