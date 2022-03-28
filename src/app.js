const express = require("express");
const app = express();

app.get("/", function(req, res){
    res.send("Controle Financeiro");
});

app.listen(8087, function(){
    console.log("Server Started!");
});