import { Router } from 'express';
import { resolve } from 'path';
import { BancoRepository } from '../repository/BancoRepository';
import { CartaoRepository } from '../repository/CartaoRepository';
import { UsuarioRepository } from '../repository/UsuarioRepository';
import { Cartao } from "../models/Cartao";
import { _CartaoService } from '../services/_cartaoService';

export const routerCartao = Router();
const _cartaoService = new _CartaoService();

//Salvar Cartao
routerCartao.post('/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const body = req.body;
    await _cartaoService.adicionaCartao(idUsuario,body).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

//GetById Cartao
routerCartao.get('/:idCartao', async (req, res) => {
    const { idCartao } = req.params;
    await _cartaoService.retornaCartaoPorId(idCartao).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

//Get Cartões do Usuario
routerCartao.get('/usuario/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    await _cartaoService.retornaCartoesDoUsuario(idUsuario).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

//Atualiza Cartao
routerCartao.put('/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const body = req.body;
    await _cartaoService.atualizaCartao(idUsuario,body).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

//Deleta Cartão
routerCartao.delete('/:idCartao', async (req, res) => {
    const { idCartao } = req.params;
    await _cartaoService.deletaCartao(idCartao).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

//Check Transacao
routerCartao.get('/check/:idCartao', async (req, res) => {
    const {idCartao} = req.params;
    await _cartaoService.verificaCartaoTemTransacao(idCartao).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})