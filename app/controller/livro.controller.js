const urlApi = 'http://localhost:8080/api/livros'

//criar um livro
exports.createOne = (req, res) => {
    //valida requisição
    if (!req.body.titulo) {
        res.status(400).send({ message: "O conteúdo não pode ser vazio." })
    }

    //chamada ao back
    fetch(urlApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            publicado: req.body.publicado ? req.body.publicado : false
        })
    })
        .then((response) => {
            //se status = created
            if (response.status === 201) {
                return response.json()
            }
        })
        .then((data) => {
            // retorno do back para o front
            return res.send({ livro: data, mensagem: "livro criado com sucesso" });
        })
        .catch(error => {
            return res.status(500).send({
                message: error.message || "Erro ao criar livro."
            });
        });
};


// Recuperar todos os livros
exports.findAll = (req, res) => {
    const titulo = req.query.titulo;
    //nao entendi a necessidade dessa condicao na busca
    //var condicao = titulo ? { titulo: { $regex: new RegExp(titulo, 'i') } } : {};

    const urlParam = titulo ? new URLSearchParams({
        titulo: titulo
    }) : null;

    //chamada ao back com parametro na url
    fetch(urlApi + `?${urlParam}`, {
        method: 'GET'
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        .then((data) => {
            // retorno do back para o front
            if (data) {
                return res.send({ livro: data, mensagem: "livros recuperados com sucesso" });
            }
            return res.send({ mensagem: "Sem livros salvos" });
        })
        .catch(error => {
            return res.status(500).send({
                message: error.message
            });
        });
};

//recuperar por ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    const url = urlApi + `/${id}`;

    //chamada ao back    
    fetch(url, {
        method: 'GET'
    })
        .then((response) => {
            if (response.ok) {
               return response.json()
            }
        })
        .then((data) => {
            if (data) {
                // retorno do back para o front
                return res.send({ livro: data, mensagem: "livro recuperado com sucesso" });
            }
            return res.status(404).send({ message: "ID não encontrado " + id })
        })
        .catch(error => {
            return res.status(500).send({ message: error.message })
        });
};

//alterar
exports.updateOne = (req, res) => {
    //validacao conteudo body
    if (!req.body) {
        return res.status(400).send({
            message: "Dados não poedm ser vazio!"
        })
    }

    const id = req.params.id

    // chamada ao back
    fetch(urlApi + `/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            publicado: req.body.publicado
        })
    })
        .then((response) => {
            if (response.ok) {
              return  response.json()
            }
        })
        .then((data) => {
            // retorno do back para o front
            //livro nao encontrado no banco
            if (!data) {
                return res.status(404).send({
                    message: `Não foi possível alterar id=${id}. Livro não encontrado`
                })
            } else
            return res.send({ livro: data, message: "Livro atualizado com sucesso" })
        })
        .catch(error => {
            return res.status(500).send({
                message: `Não foi possível atualizar o id ${id}`
            })
        });

};

//deletar por id
exports.deleteOne = (req, res) => {
    const id = req.params.id

    fetch(urlApi + `/${id}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (response.status == 200) {
                return res.send({ message: "Livro deletado com sucesso" })
            }
            return res.status(404).send({
                message: `Não foi possivel deletar o id=${id}. Livro não encontrado`
            })
        })
        .catch(error => {
            return res.status(500).send({
                message: error.message
            })
        });
};


//deletar tudo
exports.deleteAll = (req, res) => {
    fetch(urlApi, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (response.ok) {
               return response.json()
            }
        })
        .then((data) => {
            // pegando o total de documentos removidos da colecao
            return res.send({
                message: `${data} livros foram deletados`
            })
        })
        .catch(error => {
            return res.status(500).send({
                message: error.message || "Erro ao deletar livros."
            })
        });
};

// Recuperar todos os livros publicados
exports.findAllPublicado = (req, res) => {
    fetch(urlApi.concat('/publicado'), {
        method: 'GET'
    })
        .then((response) => {
            if (response.ok) {
              return  response.json()
            }
        })
        .then((data) => {
            // Handle the response from the backend
            if (!data) {
                return res.status(404).send({
                    message: 'Não existem livros publicados.'
                })
            }
            return res.send(data)
        })
        .catch(error => {
            return res.status(500).send({
                message: error.message || "Erro ao recuperar livros publicados."
            });
        });
};