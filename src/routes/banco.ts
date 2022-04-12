import { Router } from 'express';
import { resolve } from 'path';
import { BancoController } from '../controller/BancoController';
import { UsuarioController } from '../controller/UsuarioController';
import { Banco } from '../entity/Banco';

export const routerBanco = Router();
const bancoController = new BancoController();
const usuarioController = new UsuarioController();

//Salvar Banco
routerBanco.post('/', async (req, res) => {
    const dados = req.body;
    const usuario = await usuarioController.getById(dados.idUsuario);
    if (usuario){
        const banco = new Banco(dados.banco, dados.nome, dados.saldo, dados.conta, dados.agencia, dados.usuario);
        const cartaoSalvo = await bancoController.salvar(banco);
        res.json(cartaoSalvo);
    } else {
        res.status(404).json({message: 'Usuário não encontrado'});
    }
})

//GetAll Cartões
routerBanco.get('/',async (req, res) => {
    const cartoes = await bancoController.getAll();
    res.json(cartoes);
})