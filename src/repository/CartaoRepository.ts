import { AppDataSource } from "../data-source";
import { Banco } from "../models/Banco";
import { Cartao } from "../models/Cartao";
import { Transacao } from "../models/Transacao";
import { Usuario } from "../models/Usuario";

const database = AppDataSource;

export class CartaoRepository {
    async salvar(cartao: Cartao) {
        if (cartao.bancoCadastrado) {
            await database.createQueryBuilder()
                .insert()
                .into(Cartao)
                .values([{
                    nome: cartao.nome,
                    titular: cartao.titular,
                    numero: cartao.numero,
                    modalidade: cartao.modalidade,
                    bancoCadastrado: cartao.bancoCadastrado,
                    bancoCartao: cartao.bancoCartao,
                    banco: '',
                    vencimentoFatura: cartao.vencimentoFatura,
                    validade: new Date(cartao.validade).toISOString().slice(0, 10).replace('T', ' '),
                    codigo: cartao.codigo,
                    usuario: cartao.usuario,
                }])
                .execute();
        } else {
            await database.createQueryBuilder()
                .insert()
                .into(Cartao)
                .values([{
                    nome: cartao.nome,
                    titular: cartao.titular,
                    numero: cartao.numero,
                    modalidade: cartao.modalidade,
                    bancoCadastrado: cartao.bancoCadastrado,
                    banco: cartao.banco,
                    vencimentoFatura: cartao.vencimentoFatura,
                    validade: new Date(cartao.validade).toISOString().slice(0, 10).replace('T', ' '),
                    codigo: cartao.codigo,
                    usuario: cartao.usuario,
                }])
                .execute();
        }
        return true;
    }

    async getAll() {
        const cartoes = await database.manager.find(Cartao);
        return cartoes;
    }

    async getBancoCartaoId(idCartao:string){
        const bancoCartaoId = await database.manager.query('SELECT bancoCartaoId FROM controlefinanceiro.cartao WHERE id = "' + idCartao + '";');
        return bancoCartaoId;
    }

    async getById(id: string) {
        let cartao: Cartao;
        if (id != null || id != "") {
            cartao = await database.manager.findOne(Cartao, {
                where: {
                    id: id
                },
                relations:{
                    bancoCartao:true,
                    usuario:true
                }
            });
            
        } else {
            cartao = null;
        }
        return cartao;
    }

    async getCartoesDoUsuario(idUsuario: string) {
        const cartoes = await database.manager.find(Usuario, {
            relations: {
                cartao: {
                    bancoCartao: true
                }
            },
            where: {
                id: idUsuario
            }
        })
        return cartoes;
    }

    async update(cartao: Cartao) {
        if (cartao != null) {
            if (cartao.bancoCadastrado) {
                await database.createQueryBuilder()
                    .update(Cartao)
                    .set({
                        nome: cartao.nome,
                        titular: cartao.titular,
                        numero: cartao.numero,
                        modalidade: cartao.modalidade,
                        bancoCadastrado: cartao.bancoCadastrado,
                        bancoCartao: cartao.bancoCartao,
                        banco: '',
                        vencimentoFatura: cartao.vencimentoFatura,
                        validade: new Date(cartao.validade).toISOString().slice(0, 10).replace('T', ' '),
                        codigo: cartao.codigo,
                        usuario: cartao.usuario,
                    })
                    .where("id = :id", { id: cartao.id })
                    .execute()
            } else {
                await database.createQueryBuilder()
                    .update(Cartao)
                    .set({
                        nome: cartao.nome,
                        titular: cartao.titular,
                        numero: cartao.numero,
                        modalidade: cartao.modalidade,
                        bancoCadastrado: cartao.bancoCadastrado,
                        banco: cartao.banco,
                        vencimentoFatura: cartao.vencimentoFatura,
                        validade: new Date(cartao.validade).toISOString().slice(0, 10).replace('T', ' '),
                        codigo: cartao.codigo,
                        usuario: cartao.usuario,
                    })
                    .where("id = :id", { id: cartao.id })
                    .execute()
            }
            return true;
        } else {
            return null;
        }

    }

    async delete(id: string) {
        if (id != null || id != '') {
            return await database.manager.delete(Cartao, id);
        } else {
            return null;
        }
    }

    async checkCartao(idCartao: string) {
        let qtdTransacao: number;
        if (idCartao != null) {
            qtdTransacao = await database.manager.createQueryBuilder().select("transacao").from(Transacao, "transacao").where("transacao.cartaoId = :id", { id: idCartao }).getCount();
            if (qtdTransacao != null) {
                if (qtdTransacao > 0)
                    return true
            } else {
                return null
            }
        } else {
            return null
        }
    }
}