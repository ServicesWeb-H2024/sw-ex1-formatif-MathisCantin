const express = require('express');
const router = express.Router();

const Titre = require("../controllers/titre.controller");

router.get('/:show_type', (req, res) => {
    Titre.titrePagination(req, res);
});

module.exports = router;