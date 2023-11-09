const express = require('express');
const livroController = require('../controller/livro.controller');

const router = express.Router();
const urlApi = '/api/livros';

//criar e recuperar todos

router
    .route(urlApi.concat('/publicado'))
    .get(livroController.findAllPublicado);

router
    .route(urlApi)
    .get(livroController.findAll);

router
    .route(urlApi)
    .post(livroController.createOne)
    .delete(livroController.deleteAll);

router
    .route(urlApi.concat('/:id'))
    .get(livroController.findOne)
    .put(livroController.updateOne)
    .delete(livroController.deleteOne);

module.exports = router;