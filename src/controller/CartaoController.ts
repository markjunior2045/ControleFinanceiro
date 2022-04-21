import { AppDataSource } from "../data-source";
import { Cartao } from "../entity/Cartao";

const database = AppDataSource;

export class CartaoController {
    async salvar (cartao: Cartao){
        const cartaoSalvo = await database.manager.save(cartao);
        return cartaoSalvo;
    }

    async getAll(){
        const cartoes = await database.manager.find(Cartao);
        return cartoes;
    }

    async getById(id: string){
        let cartao: Cartao;
        if (id != null || id != "") {
            cartao = await database.manager.findOneBy(Cartao,{id: id});
        }else{
            cartao = null;
        }
        return cartao;
    }
}