import { AppDataSource } from "../data-source";
import { Transacao } from "../entity/Transacao";

const database = AppDataSource;

export class TransacaoController {
    async salvar (transacao: Transacao){
        const transacaoSalva = await database.manager.save(transacao);
        return transacaoSalva;
    }
}