import "reflect-metadata"
import { DataSource } from "typeorm"
import { Usuario } from "./models/Usuario"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "controlefinanceiro",
    synchronize: true,
    logging: false,
    entities: ["src/models/**/*.ts"],
    migrations: [],
    subscribers: [],
})
