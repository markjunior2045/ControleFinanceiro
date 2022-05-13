import { AppDataSource } from "../data-source";
import { Banco } from "../entity/Banco";
import { Cartao } from "../entity/Cartao";
import { Usuario } from "../entity/Usuario";

const database = AppDataSource;

export class CartaoController {
    async salvar(cartao: Cartao) {
        if (cartao.bancoCadastrado) {
            await database.createQueryBuilder()
                .insert()
                .into(Cartao)
                .values([{
                    nome: cartao.nome,
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

    async getById(id: string) {
        let cartao: Cartao;
        if (id != null || id != "") {
            cartao = await database.manager.findOneBy(Cartao, { id: id });
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
            if(cartao.bancoCadastrado){
                await database.createQueryBuilder()
                .update(Cartao)
                .set({
                    nome: cartao.nome,
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
            }else{
                await database.createQueryBuilder()
                .update(Cartao)
                .set({
                    nome: cartao.nome,
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
}