import { AppDataSource } from "./data-source"
import { Usuario } from "./entity/Usuario"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new Usuario()
    user.id = "724e01c2-b7b9-445f-a18c-a13f9535e326"
    user.email = "usuario@email.com"
    user.nome = "Nome"
    user.sobrenome = "Sobrenome"
    user.senha = "Password"
    user.salario = 1000
    user.porcentagem = 50
    user.telefone = 12345678
    user.datanascimento = new Date();
    user.cpf = 101
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(Usuario)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
