import { Cartao } from "../models/Cartao";
import { BancoRepository } from "../repository/BancoRepository";
import { CartaoRepository } from "../repository/CartaoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

const usuarioRepository = new UsuarioRepository();
const cartaoRepository = new CartaoRepository();
const bancoRepository = new BancoRepository();

export class _CartaoService {
    async adicionaCartao(idUsuario: string, body) {
        const usuario = await usuarioRepository.getById(idUsuario);
        if (usuario) {
            let cartaoSalvo: boolean;
            const cartao = new Cartao(body.nome, body.titular, body.numero, body.modalidade, body.bancoCadastrado, body.vencimentoFatura, body.validade, body.codigo, usuario);
            if (body.bancoCadastrado) {
                const banco = await bancoRepository.getById(body.bancoid);
                cartao.bancoCartao = banco;
            } else {
                cartao.banco = body.banco;
            }
            cartaoSalvo = await cartaoRepository.salvar(cartao);
            return cartaoSalvo;
        } else {
            return null;
        }
    }

    async retornaCartaoPorId(idCartao: string) {
        const cartao = await cartaoRepository.getById(idCartao);
        return cartao;
    }

    async retornaCartoesDoUsuario(idUsuario: string) {
        const cartoes = await cartaoRepository.getCartoesDoUsuario(idUsuario);
        return cartoes;
    }

    async atualizaCartao(idUsuario: string, body) {
        const usuario = await usuarioRepository.getById(idUsuario);
        const cartao = new Cartao(body.nome, body.titular, body.numero, body.modalidade, body.bancoCadastrado, body.vencimentoFatura, body.validade, body.codigo, usuario);
        cartao.id = body.id;
        if (cartao.bancoCadastrado) {
            const banco = await bancoRepository.getById(body.bancoid);
            cartao.bancoCartao = banco;
        } else {
            cartao.banco = body.banco;
        }
        await cartaoRepository.update(cartao);
        return true;
    }

    async deletaCartao(idCartao) {
        if (idCartao != null || idCartao != '') {
            await cartaoRepository.delete(idCartao);
            return true;
        } else {
            return false;
        }
    }

    async verificaCartaoTemTransacao(idCartao: string) {
        if (idCartao != null || idCartao != '') {
            const result = await cartaoRepository.checkCartao(idCartao);
            if (result != null) {
                if (result) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}