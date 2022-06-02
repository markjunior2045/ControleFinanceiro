import { AppDataSource } from "../data-source";
import { Tag } from "../models/Tag";
import { Transacao } from "../models/Transacao";
import { Usuario } from "../models/Usuario";

const database = AppDataSource;

export class TagRepository {
    async salvar(tag: Tag) {
        const tagSalva = await database.manager.save(tag);
        return tagSalva;
    }

    async getTagsDoUsuario(idUsuario: string) {
        const tags = await database.manager.find(Usuario, {
            relations: {
                tag: true
            },
            where: {
                id: idUsuario
            },
        })
        return tags;
    }

    async getTransacaoComTags(idtag: string) {
        if (idtag != null || idtag != "") {
            return await database.manager.find(Transacao, {
                relations: {
                    tag: true
                },
                where: {
                    tag: {
                        id: idtag
                    }
                }
            })
        } else {
            return null;
        }
    }

    async getTransacaoTags(idtag: string) {
        if (idtag != null || idtag != "") {
            return await database.manager.find(Transacao, {
                relations: {
                    tag: true
                }
            })
        } else {
            return null;
        }
    }

    async getById(id: string) {
        let tag: Tag;
        if (id != null || id != "") {
            tag = await database.manager.findOneBy(Tag, { id: id });
        } else {
            tag = null;
        }
        return tag;
    }

    async getCountTipoTag(idUsuario: string){
        return await database.manager.query('SELECT tg.tipo, count(tg.tipo) AS qtd FROM  transacao_tag_tag ttt JOIN  tag tg ON ttt.tagId = tg.id JOIN  transacao ts ON ttt.transacaoId = ts.id WHERE tg.usuarioId = "' + idUsuario + '" GROUP BY tg.tipo');
    }

    async novaTagTransacao(idTag: string, idTransacao: string) {
        if (idTag != null || idTag != '' || idTransacao != null || idTransacao != '') {
            return await database.manager.query('INSERT INTO `controlefinanceiro`.`transacao_tag_tag` (`transacaoId`,`tagId`) VALUES("' + idTransacao + '","' + idTag + '");');
        } else {
            return null;
        }
    }

    async update(tag: Tag) {
        let tagSalva: Tag;
        if (tag != null) {
            tagSalva = await database.manager.save(tag);
        } else {
            tagSalva = null;
        }
        return tagSalva;
    }

    async deleteTagRelation(id: string) {
        if (id != null || id != '') {
            return await database.manager.query('DELETE FROM `controlefinanceiro`.`transacao_tag_tag` WHERE tagId = "' + id + '";');
        } else {
            return null;
        }
    }

    async delete(id: string) {
        if (id != null || id != '') {
            return await database.manager.delete(Tag, id);
        } else {
            return null;
        }
    }
}