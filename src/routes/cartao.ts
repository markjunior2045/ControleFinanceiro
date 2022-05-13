import { Router } from 'express';
import { resolve } from 'path';
import { BancoController } from '../controller/BancoController';
import { CartaoController } from '../controller/CartaoController';
import { UsuarioController } from '../controller/UsuarioController';
import { Cartao } from "../entity/Cartao";

export const routerCartao = Router();
const cartaoController = new CartaoController();
const bancoController = new BancoController();
const usuarioController = new UsuarioController();

//Salvar Cartao
routerCartao.post('/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const dados = req.body;
    const usuario = await usuarioController.getById(idUsuario);
    if (usuario) {
        let cartaoSalvo: boolean;
        const cartao = new Cartao(dados.nome, dados.numero, dados.modalidade, dados.bancoCadastrado, dados.vencimentoFatura, dados.validade, dados.codigo, usuario);
        if (dados.bancoCadastrado) {
            const banco = await bancoController.getById(dados.bancoid);
            cartao.bancoCartao = banco;
        }
        cartaoSalvo = await cartaoController.salvar(cartao);
        res.json(cartaoSalvo);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
})

//GetAll Cartões
routerCartao.get('/', async (req, res) => {
    const cartoes = await cartaoController.getAll();
    res.json(cartoes);
})

//GetById Cartao
routerCartao.get('/:idCartao', async (req, res) => {
    const { idCartao } = req.params;
    const cartao = await cartaoController.getById(idCartao);
    res.json(cartao);
})

//Get Cartões do Usuario
routerCartao.get('/usuario/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const cartoes = await cartaoController.getCartoesDoUsuario(idUsuario);
    res.json(cartoes);
})

//Atualiza Cartao
routerCartao.put('/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const dados = req.body;
    const usuario = await usuarioController.getById(idUsuario);
    const cartao = new Cartao(dados.nome, dados.numero, dados.modalidade, dados.bancoCadastrado, dados.vencimentoFatura, dados.validade, dados.codigo, usuario);
    cartao.id = dados.id;
    if (cartao.bancoCadastrado) {
        const banco = await bancoController.getById(dados.bancoid);
        cartao.bancoCartao = banco;
    } else {
        cartao.banco = dados.banco;
    }
    const result = await cartaoController.update(cartao);
    res.json({ result: 'Ok' });
})

//Deleta Cartão
routerCartao.delete('/:idCartao', async (req, res) => {
    const { idCartao } = req.params;
    if (idCartao != null || idCartao != '') {
        const result = await cartaoController.delete(idCartao);
        res.json(result);
    } else {
        res.json(null);
    }
})