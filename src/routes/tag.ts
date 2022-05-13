import { Router } from "express";
import { TagController } from "../controller/TagController";
import { UsuarioController } from "../controller/UsuarioController";
import { Tag } from "../entity/Tag";

export const routerTag = Router();
const usuarioController = new UsuarioController();
const tagController = new TagController();

//Salvar
routerTag.post('/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const dados = req.body;
    const usuario = await usuarioController.getById(idUsuario);
    if (usuario) {
        const tag = new Tag(dados.nome, dados.tipo, usuario);
        const tagSalva = await tagController.salvar(tag);
        res.status(200).json({message:'Sucesso!'});
    } else {
        res.status(404).json({message: 'Usuario não encontrado'});
    }
})

//Get All Usuario
routerTag.get('/usuario/:idUsuario',async (req, res) => {
    console.log('Caiu aqui');
    
    const { idUsuario } = req.params;
    const tag = await tagController.getTagsDoUsuario(idUsuario);
    res.json(tag);
})

//GetById
routerTag.get('/:idTag', async (req, res) => {
    const {idTag} = req.params;
    const tag = await tagController.getById(idTag);
    res.json(tag);
})

//Atualiza Transação
routerTag.put('/:idUsuario', async (req, res) => {
    const {idUsuario} = req.params;
    const dados = req.body;
    const usuario = await usuarioController.getById(idUsuario);
    const tag = new Tag(dados.nome,dados.tipo,usuario);
    tag.id = dados.id;
    const result = await tagController.update(tag);
    res.json({result:'Ok'});
})

//DeletaTransação
routerTag.delete('/:idTag', async (req, res) => {
    const {idTag} = req.params;
    if (idTag != null || idTag != ''){
        const result = await tagController.delete(idTag);
        res.json(result);
    }else{
        res.json(null);
    }
})