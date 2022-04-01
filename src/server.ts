import { app } from "./app";

const port = 3000;

const server = app.listen(port,() => console.log(`App na porta ${port}`));

process.on('SIGINT',() =>{
    server.close();
    console.log('App finalizado');    
})