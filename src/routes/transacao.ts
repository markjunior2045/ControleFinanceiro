import { Router } from 'express';
import { resolve } from 'path';
import { BancoController } from '../controller/BancoController';
import { CartaoController } from '../controller/CartaoController';
import { TransacaoController } from '../controller/TransacaoController';
import { UsuarioController } from '../controller/UsuarioController';
import { Transacao } from '../entity/Transacao';

export const routerTransacao = Router();
const transacaoController = new TransacaoController();
const bancoController = new BancoController();
const cartaoController = new CartaoController();
const usuarioController = new UsuarioController();

//Salvar Transação
routerTransacao.post('/:idUsuario', async(req, res) => {
    const {idUsuario} = req.params;
    console.log('id: ' + idUsuario);
    const dados = req.body;
    const usuario = await usuarioController.getById(idUsuario);
    if (usuario) {
        const transacao = new Transacao(dados.descricao,dados.entrada, dados.valor, dados.metodo, false, 1, dados.data, usuario);
        if(dados.bancoid != '' && dados.bancoid != null && dados.bancoid != undefined){
            const banco = await bancoController.getById(dados.bancoid);
            transacao.banco = banco;
        }
        if(dados.cartaoid != '' && dados.cartaoid != null && dados.cartaoid != undefined){
            const cartao = await cartaoController.getById(dados.cartaoid);
            transacao.cartao = cartao;
        }
        const transacaoSalva = await transacaoController.salvar(transacao);
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