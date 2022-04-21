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
        const banco = new Banco(dados.banco, dados.titular, dados.saldo, dados.conta, dados.agencia, dados.usuario);
        const bancoSalvo = await bancoController.salvar(banco);
        res.json(bancoSalvo);
    } else {
        res.status(404).json({message: 'Usuário não encontrado'});
    }
})

//GetAll Cartões
routerBanco.get('/',async (req, res) => {
    const bancos = await bancoController.getAll();
    res.json(bancos);
})

//GetById Banco
routerBanco.get('/:idBanco', async (req, res) => {
    const {idBanco} = req.params;
    const banco = await bancoController.getById(idBanco);
    res.json(banco);
})