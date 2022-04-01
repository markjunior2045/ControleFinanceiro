import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";

export const conectarNoBd = async () => {
    const database = AppDataSource;

    const conexao = await database.initialize();
    console.log(`App conectado a ${conexao.options.database}`);

    process.on('SIGINT', () => {
        conexao.destroy().then(() => console.log('Conexão fechada com o BD'))
    });
};