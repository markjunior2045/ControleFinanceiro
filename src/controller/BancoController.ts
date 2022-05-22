import { AppDataSource } from "../data-source";
import { Banco } from "../entity/Banco";
import { Cartao } from "../entity/Cartao";
import { Transacao } from "../entity/Transacao";
import { Usuario } from "../entity/Usuario";

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

    async getBancosDoUsuario(idUsuario: string){
        const bancos = await database.manager.find(Usuario,{
            relations: {
                banco: true
            },
            where: {
               id: idUsuario 
            },
        })
        return bancos;
    }

    async update(banco:Banco){
        let bancoSalvo: Banco;
        if(banco != null){
            bancoSalvo = await database.manager.save(banco);
        }else{
            bancoSalvo = null;
        }
        return bancoSalvo;
    }

    async delete(id: string){
        if (id != null || id != ''){
            return await database.manager.delete(Banco, id);
        }else{
            return null;
        }
    }

    async checkCartao(idBanco: string){
        let qtdCartao:number;
        let qtdTransacao:number;
        if (idBanco != null) {
            qtdCartao = await database.manager.createQueryBuilder().select("cartao").from(Cartao,"cartao").where("cartao.bancoCartaoId = :id",{id: idBanco}).getCount();
            qtdTransacao = await database.manager.createQueryBuilder().select("transacao").from(Transacao,"transacao").where("transacao.bancoId = :id",{id: idBanco}).getCount();
            if(qtdCartao != null && qtdTransacao != null){
                if(qtdCartao > 0 || qtdTransacao > 0)
                    return true
            }else{
                return null
            }
        }else{
            return null
        }
    }
}