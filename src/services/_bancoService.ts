import { UsuarioRepository } from "../repository/UsuarioRepository";
import { BancoRepository } from "../repository/BancoRepository";
import { Banco } from "../models/Banco";

const usuarioRepository = new UsuarioRepository();
const bancoRepository = new BancoRepository();

export class _BancoService {

    async adicionaBanco(idUsuario: string, body) {
        const usuario = await usuarioRepository.getById(idUsuario);
        if (usuario) {
            const banco = new Banco(body.banco, body.titular, body.saldo, body.conta, body.agencia, usuario);
            await bancoRepository.salvar(banco);
            return true;
        } else {
            return false;
        }
    }

    async retornaBancoPorId(idBanco: string) {
        const banco = await bancoRepository.getById(idBanco);
        return banco;
    }

    async retornaBancosDoUsuario(idUsuario: string) {
        const bancos = await bancoRepository.getBancosDoUsuario(idUsuario);
        return bancos;
    }

    async atualizaBanco(idUsuario: string, body) {
        const usuario = await usuarioRepository.getById(idUsuario);
        const banco = new Banco(body.banco, body.titular, body.saldo, body.conta, body.agencia, usuario);
        banco.id = body.id
        if (usuario != null && banco != null) {
            await bancoRepository.update(banco);
            return true;
        } else {
            return false;
        }
    }

    async deletaBanco(idBanco: string) {
        if (idBanco != null || idBanco != '') {
            await bancoRepository.delete(idBanco);
            return true;
        } else {
            return false;
        }
    }

    async verificaBancoTemCartao(idBanco: string) {
        if (idBanco != null || idBanco != '') {
            const result = await bancoRepository.checkCartao(idBanco);
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