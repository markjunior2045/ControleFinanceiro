import { Router } from 'express';
import { resolve } from 'path';
import { CartaoController } from '../controller/CartaoController';
import { UsuarioController } from '../controller/UsuarioController';
import { Cartao } from "../entity/Cartao";

export const routerCartao = Router();
const cartaoController = new CartaoController();
const usuarioController = new UsuarioController();

//Salvar Cartao
routerCartao.post('/', async (req, res) => {
    const dados = req.body;
    const usuario = await usuarioController.getById(dados.idUsuario);
    if (usuario){
        const cartao = new Cartao(dados.nome, dados.numero, dados.modalidade, dados.bancoCadastrado, dados.vencimentoFatura, dados.validade, dados.codigo, dados.usuario);
        const cartaoSalvo = await cartaoController.salvar(cartao);
        res.json(cartaoSalvo);
    } else {
        res.status(404).json({message: 'Usuário não encontrado'});
    }
})

//GetAll Cartões
routerCartao.get('/',async (req, res) => {
    const cartoes = await cartaoController.getAll();
    res.json(cartoes);
})

//GetById Cartao
routerCartao.get('/:idCartao', async (req, res) => {
    const {idCartao} = req.params;
    const cartao = await cartaoController.getById(idCartao);
    res.json(cartao);
})