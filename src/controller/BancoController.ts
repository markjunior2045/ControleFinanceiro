import { AppDataSource } from "../data-source";
import { Banco } from "../entity/Banco";

const database = AppDataSource;

export class BancoController {
    async salvar (banco: Banco){
        const bancoSalvo = await database.manager.save(banco);
        return bancoSalvo;
    }

    async getAll(){
        const bancos = await database.manager.find(Banco);
        return bancos;
    }
}