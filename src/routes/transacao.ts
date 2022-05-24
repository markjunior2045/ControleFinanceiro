import { Router } from 'express';
import { resolve } from 'path';
import { Guid } from '../../FrontEnd/src/app/model/guid.model';
import { BancoController } from '../controller/BancoController';
import { CartaoController } from '../controller/CartaoController';
import { TagController } from '../controller/TagController';
import { TransacaoController } from '../controller/TransacaoController';
import { UsuarioController } from '../controller/UsuarioController';
import { Tag } from '../entity/Tag';
import { Transacao } from '../entity/Transacao';

export const routerTransacao = Router();
const transacaoController = new TransacaoController();
const bancoController = new BancoController();
const cartaoController = new CartaoController();
const usuarioController = new UsuarioController();
const tagController = new TagController();

//Salvar Transação
routerTransacao.post('/:idUsuario', async(req, res) => {
    const {idUsuario} = req.params;
    const dados = req.body;
    let newId:string = Guid.newGuid();
    let tags:string[];
    let tagTransacao:Tag;
    let tagsTransacao:Tag[] = [];
    console.log("New ID: " + newId);
    
    const usuario = await usuarioController.getById(idUsuario);
    if (usuario) {
        const transacao = new Transacao(dados.descricao,dados.entrada, dados.valor, dados.metodo, false, 1, dados.data, usuario);
        transacao.id = newId;
        if(dados.bancoid != '' && dados.bancoid != null && dados.bancoid != undefined){
            const banco = await bancoController.getById(dados.bancoid);
            transacao.banco = banco;
        }
        if(dados.cartaoid != '' && dados.cartaoid != null && dados.cartaoid != undefined){
            const cartao = await cartaoController.getById(dados.cartaoid);
            transacao.cartao = cartao;
        }
        const transacaoSalva = await transacaoController.salvar(transacao);
        tags = dados.tags;
        console.log("Salvo: " + transacaoSalva.id);
        
        if(tags.length > 0){
            tags.forEach(async tag => {
                await tagController.novaTagTransacao(tag,newId);
            })
        }
        
        // const tag1 = await tagController.getById("4f2eedec-0a1a-43ee-8f8e-e63bcbe5a23c");
        // const tag2 = await tagController.getById("a5a7d7da-e6cc-44c5-b8a7-40fb84ad0f65");
        // transacao.tag = [tag1,tag2];
        
        res.status(200).json({message: 'Sucesso'});
    } else {
        res.status(404).json({message: 'Usuário não encontrado'})
    }
})

//GetAll Transações
routerTransacao.get('/',async (req, res) => {
    const transacoes = await transacaoController.getAll();
    res.json(transacoes);
})

//GetById Transacao
routerTransacao.get('/:idTransacao', async (req, res) => {
    const {idTransacao} = req.params;
    const transacao = await transacaoController.getById(idTransacao);
    res.json(transacao);
})

//Get por mes
routerTransacao.get('/:idUsuario/:mes',async (req, res) => {
    const {idUsuario} = req.params;
    const {mes} = req.params;
    const transacoes = await transacaoController.getByMonth(idUsuario,parseInt(mes));
    res.json(transacoes);
})

//Atualiza Transação
routerTransacao.put('/:idUsuario', async (req, res) => {
    const {idUsuario} = req.params;
    const dados = req.body;
    const usuario = await usuarioController.getById(idUsuario);
    const transacao = new Transacao(dados.descricao, dados.entrada, dados.valor, dados.metodo, dados.parcelado, dados.quantidadeParcelas, dados.data, usuario);
    transacao.id = dados.id;
    if(dados.bancoid != '' && dados.bancoid != null && dados.bancoid != undefined){
        const banco = await bancoController.getById(dados.bancoid);
        transacao.banco = banco;
    }
    if(dados.cartaoid != '' && dados.cartaoid != null && dados.cartaoid != undefined){
        const cartao = await cartaoController.getById(dados.cartaoid);
        transacao.cartao = cartao;
    }
    const result = await transacaoController.update(transacao);
    res.json({result:'Ok'});
})

//DeletaTransação
routerTransacao.delete('/:idTransacao', async (req, res) => {
    const {idTransacao} = req.params;
    if (idTransacao != null || idTransacao != ''){
        const result = await transacaoController.delete(idTransacao);
        res.json(result);
    }else{
        res.json(null);
    }
})