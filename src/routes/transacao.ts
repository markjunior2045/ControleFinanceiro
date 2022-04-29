import { Router } from 'express';
import { resolve } from 'path';
import { TransacaoController } from '../controller/TransacaoController';
import { UsuarioController } from '../controller/UsuarioController';
import { Transacao } from '../entity/Transacao';

export const routerTransacao = Router();
const transacaoController = new TransacaoController();
const usuarioController = new UsuarioController();

//Salvar Transação
routerTransacao.post('/', async(req, res) => {
    const dados = req.body;
    const usuario = await usuarioController.getById(dados.idUsuario);
    if (usuario) {
        const transacao = new Transacao(dados.descricao, dados.valor, dados.metodo, dados.parcelado, dados.quantidadeParcelas, dados.data, dados.usuario);
        const transacaoSalva = await transacaoController.salvar(transacao);
        res.json(transacaoSalva);
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