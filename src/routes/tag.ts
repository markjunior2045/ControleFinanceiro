import { Router } from "express";
import { TagController } from "../controller/TagController";
import { TransacaoController } from "../controller/TransacaoController";
import { UsuarioController } from "../controller/UsuarioController";
import { Tag } from "../entity/Tag";

export const routerTag = Router();
const usuarioController = new UsuarioController();
const tagController = new TagController();
const transacaoController = new TransacaoController();

//Salvar
routerTag.post('/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const dados = req.body;
    const usuario = await usuarioController.getById(idUsuario);
    if (usuario) {
        const tag = new Tag(dados.nome, dados.tipo, usuario);
        const tagSalva = await tagController.salvar(tag);
        res.status(200).json({ message: 'Sucesso!' });
    } else {
        res.status(404).json({ message: 'Usuario não encontrado' });
    }
})

//Get All Usuario
routerTag.get('/usuario/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const tag = await tagController.getTagsDoUsuario(idUsuario);
    res.json(tag);
})

//Get Transacao com Tag
routerTag.get('/transacoes/:idtag', async (req, res) => {
    const { idtag } = req.params;
    const transacoes = await tagController.getTransacaoTags(idtag);
    res.json(transacoes);
})

//Count tag tipo
routerTag.get('/count/tipo/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const tipos = await tagController.getCountTipoTag(idUsuario);
    res.json(tipos)
})

//GetById
routerTag.get('/:idTag', async (req, res) => {
    const { idTag } = req.params;
    const tag = await tagController.getById(idTag);
    res.json(tag);
})

//Atualiza Tag
routerTag.put('/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const dados = req.body;
    const usuario = await usuarioController.getById(idUsuario);
    const tag = new Tag(dados.nome, dados.tipo, usuario);
    tag.id = dados.id;
    const result = await tagController.update(tag);
    res.json({ result: 'Ok' });
})

//Deleta Tag
routerTag.delete('/:idTag', async (req, res) => {
    const { idTag } = req.params;
    let test:Tag[]
    if (idTag != null || idTag != '') {
        const test = await tagController.delete(idTag);
        console.log(test);
        res.json(test);
    } else {
        res.json(null);
    }
})

routerTag.get('/checktag/:idTag', async (req, res) => {
    const { idTag } = req.params;
    const transacoes = await tagController.getTransacaoComTags(idTag);
    console.log(transacoes[0]);
    
    if (transacoes.length > 0) {
        res.json(true);
    } else {
        res.json(false);
    }
})

routerTag.get('/limpatag/:idTag', async (req, res) => {
    const { idTag } = req.params;
    const transacoes = await tagController.getTransacaoTags(idTag);
    transacoes.forEach(async (x) => {
        x.tag = x.tag.filter((tag) => {
            return tag.id != idTag;
        });
        await transacaoController.update(x);
    })
    await tagController.deleteTagRelation(idTag);
    res.json(true);
})