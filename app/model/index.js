const dbConfig = require("../config/db.dbConfig.js");

const mongoose = require("mongoose");
mongoose.Promise=global.Promise;

const db={};
db.mongoose= mongoose;
db.url= dbConfig.url;
db.livraria = require("./livro.model.js")(mongoose);

module.exports=db;