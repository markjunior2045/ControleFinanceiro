import { AppDataSource } from "../data-source";
import { Transacao } from "../entity/Transacao";

const database = AppDataSource;

export class TransacaoController {
    async salvar (transacao: Transacao){
        const transacaoSalva = await database.manager.save(transacao);
        return transacaoSalva;
    }

    async getAll(){
        const transacoes = await database.manager.find(Transacao);
        return transacoes;
    }

    async getById(id: string){
        let transacao: Transacao;
        if (id != null || id != "") {
            transacao = await database.manager.findOneBy(Transacao,{id: id});
        }else{
            transacao = null;
        }
        return transacao;
    }

    async update(transacao: Transacao){
        let transacaoSalva: Transacao;
        if(transacao != null){
            transacaoSalva = await database.manager.save(transacao);
        }else{
            transacaoSalva = null;
        }
        return transacaoSalva;
    }
}