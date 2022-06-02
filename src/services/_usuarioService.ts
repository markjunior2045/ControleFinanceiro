import { Usuario } from "../models/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";

const usuarioRepository = new UsuarioRepository();

export class _UsuarioService {
    async adicionaUsuario(body) {
        const usuario = new Usuario(body.email, body.nome, body.sobrenome, body.senha, body.salario, body.porcentagem, body.valorReservado);
        const usuarioSalvo = await usuarioRepository.salvar(usuario);
        return usuarioSalvo;
    }

    async retornaUsuarioPorId(idUsuario: string) {
        const usuario = await usuarioRepository.getById(idUsuario);
        return usuario;
    }

    async atualizaUsuario(body) {
        const usuario = new Usuario(body.email, body.nome, body.sobrenome, body.senha, body.salario, body.porcentagem, body.valorReservado);
        usuario.id = body.id;
        const result = await usuarioRepository.update(usuario);
        return result;
    }

    async verificaEmailJaCadastrado(email: string) {
        const temEmail = await usuarioRepository.checkEmail(email);
        if (temEmail != null) {
            if (temEmail > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    async login(body){
        const usuarioId = await usuarioRepository.login(body.email,body.senha);
        return usuarioId;
    }
}