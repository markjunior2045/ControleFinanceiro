import { Tag } from "../models/Tag";
import { TagRepository } from "../repository/TagRepository";
import { TransacaoRepository } from "../repository/TransacaoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

const usuarioRepository = new UsuarioRepository();
const tagRepository = new TagRepository();
const transacaoRepository = new TransacaoRepository();

export class _TagService {
    async adicionaTag(idUsuario: string, body) {
        const usuario = await usuarioRepository.getById(idUsuario);
        if (usuario) {
            const tag = new Tag(body.nome, body.tipo, usuario);
            await tagRepository.salvar(tag);
            return true;
        } else {
            return false;
        }
    }

    async retornaTagsDoUsuario(idUsuario: string) {
        const tags = await tagRepository.getTagsDoUsuario(idUsuario);
        return tags;
    }

    async retornaTotalPorTipo(idUsuario: string) {
        const tipos = await tagRepository.getCountTipoTag(idUsuario);
        return tipos;
    }

    async retornaTagPorId(idTag: string) {
        const tag = await tagRepository.getById(idTag);
        return tag;
    }

    async atualizaTag(idUsuario: string, body) {
        const usuario = await usuarioRepository.getById(idUsuario);
        const tag = new Tag(body.nome, body.tipo, usuario);
        tag.id = body.id;
        await tagRepository.update(tag);
        return true;
    }

    async deletaTag(idTag: string) {
        if (idTag != null || idTag != '') {
            await tagRepository.delete(idTag);
            return true;
        } else {
            return false;
        }
    }

    async verificaTagTemTransacao(idTag: string) {
        const transacoes = await tagRepository.getTransacaoComTags(idTag);
        if (transacoes.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    async removeTagDaTransacao(idTag: string) {
        const transacoes = await tagRepository.getTransacaoTags(idTag);
        transacoes.forEach(async (x) => {
            x.tag = x.tag.filter((tag) => {
                return tag.id != idTag;
            });
            await transacaoRepository.update(x);
        })
        await tagRepository.deleteTagRelation(idTag);
        return true;
    }
}