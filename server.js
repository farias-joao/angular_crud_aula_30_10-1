const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const livroRouter = require('./app/routes/livro.routes');


const app = express();

var corsOptions={
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//parse requisição application/json
app.use(express.json());

//parse form - pela URL
app.use(bodyParser.urlencoded({ extended: true }));

app.use(livroRouter);

//rota simples
app.get("/",(req,res) => {
    res.json({message:"bem-vindos a aplicação"});
});

//set da porta para listen
const PORT = process.env.PORT || 8082;

app.listen(PORT,() =>{
    console.log(`Server is running na porta ${PORT}.`);
});

