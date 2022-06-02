import { Router } from "express";
import { TagRepository } from "../repository/TagRepository";
import { TransacaoRepository } from "../repository/TransacaoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { Tag } from "../models/Tag";
import { _TagService } from "../services/_tagService";

export const routerTag = Router();
const _tagService = new _TagService();

//Salvar
routerTag.post('/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const body = req.body;
    await _tagService.adicionaTag(idUsuario,body).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

routerTag.get('/usuario/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    await _tagService.retornaTagsDoUsuario(idUsuario).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

//Count tag tipo
routerTag.get('/count/tipo/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    await _tagService.retornaTotalPorTipo(idUsuario).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

//GetById
routerTag.get('/:idTag', async (req, res) => {
    const { idTag } = req.params;
    await _tagService.retornaTagPorId(idTag).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

//Atualiza Tag
routerTag.put('/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const body = req.body;
    await _tagService.atualizaTag(idUsuario,body).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

//Deleta Tag
routerTag.delete('/:idTag', async (req, res) => {
    const { idTag } = req.params;
    await _tagService.deletaTag(idTag).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

routerTag.get('/checktag/:idTag', async (req, res) => {
    const { idTag } = req.params;
    await _tagService.verificaTagTemTransacao(idTag).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

routerTag.get('/limpatag/:idTag', async (req, res) => {
    const { idTag } = req.params;
    await _tagService.removeTagDaTransacao(idTag).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})