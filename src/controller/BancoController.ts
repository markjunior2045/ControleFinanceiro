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

    async getById(id: string){
        let banco: Banco;
        if (id != null || id != "") {
            banco = await database.manager.findOneBy(Banco,{id: id});
        }else{
            banco = null;
        }
        return banco;
    }
}