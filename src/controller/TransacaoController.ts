import { AppDataSource } from "../data-source";
import { Transacao } from "../entity/Transacao";

const database = AppDataSource;

export class TransacaoController {
    async salvar(transacao: Transacao) {
        const transacaoSalva = await database.manager.save(transacao);
        return transacaoSalva;
    }

    async getAll() {
        const transacoes = await database.manager.find(Transacao);
        return transacoes;
    }

    async getById(id: string) {
        let transacao: Transacao;
        if (id != null || id != "") {
            transacao = await database.manager.findOne(Transacao,{
                where:{
                    id:id
                },
                relations: {
                    banco: true,
                    cartao: true,
                    usuario: true
                }
            });
        } else {
            transacao = null;
        }
        return transacao;
    }

    async getSumByMonth(idUsuario: string) {
        await database.manager.query('SET lc_time_names = "pt_PT";');
        return await database.manager.query('SELECT MONTH(ts.data) AS Mes, SUM(ts.valor) AS qtd FROM  transacao ts WHERE ts.usuarioId = "' + idUsuario + '" GROUP BY MONTH(ts.data);')
    }

    async getByMonth(idUsuario: string, mes: number) {
        if (idUsuario != null || mes != null) {
            const transacoes = await database.getRepository(Transacao)
                .createQueryBuilder("transacao")
                .leftJoinAndSelect("transacao.banco", "banco")
                .leftJoinAndSelect("transacao.cartao", "cartao")
                .leftJoinAndSelect("transacao.tag", "tag")
                .where("MONTH(transacao.data) = :mes", { mes: mes })
                .andWhere("transacao.usuarioId = :id", { id: idUsuario })
                .getMany();
            return transacoes;
        }
    }

    async update(transacao: Transacao) {
        let transacaoSalva: Transacao;
        if (transacao != null) {
            transacaoSalva = await database.manager.save(transacao);
        } else {
            transacaoSalva = null;
        }
        return transacaoSalva;
    }

    async delete(id: string) {
        if (id != null || id != '') {
            return await database.manager.delete(Transacao, id);
        } else {
            return null;
        }
    }
}