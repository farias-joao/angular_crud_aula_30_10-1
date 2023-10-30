const livros = require("../controller/livro.controller");
module.exports = app => {
    const livros = require("../controller/livro.controller")

    var router = require("express").Router()

    //criar
    router.post("/", livros.create)

    //recuperar todos
    router.get("/", livros.findAll)

    //recuperar por publicacao
    router.get("/publicado", livros.findAllPublicados)

    //recuperar por id
    router.get("/:id", livros.findOne)

    //update por id
    router.put("/:id", livros.update)

    //deletar por id
    router.delete("/:id", livros.delete)

    //deletar todos
    router.delete("/", livros.deleteAll)

    app.use("/api/livros", router)

}