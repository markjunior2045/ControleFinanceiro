import { Router } from 'express';
import { resolve } from 'path';
import { BancoController } from '../controller/BancoController';
import { UsuarioController } from '../controller/UsuarioController';
import { Banco } from '../entity/Banco';

export const routerBanco = Router();
const bancoController = new BancoController();
const usuarioController = new UsuarioController();

//Salvar Banco
routerBanco.post('/:idUsuario', async (req, res) => {
    const dados = req.body;
    const { idUsuario } = req.params;
    const usuario = await usuarioController.getById(idUsuario);
    if (usuario){
        const banco = new Banco(dados.banco, dados.titular, dados.saldo, dados.conta, dados.agencia, usuario);
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

//Get Bancos do Usuário
routerBanco.get('/usuario/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const bancos = await bancoController.getBancosDoUsuario(idUsuario);
    res.json(bancos);
})

//Atualiza Banco
routerBanco.put('/:idUsuario',async (req, res) => {
    const {idUsuario} = req.params;
    const dados = req.body;
    const usuario = await usuarioController.getById(idUsuario);
    const banco = new Banco(dados.banco,dados.titular,dados.saldo,dados.conta,dados.agencia,usuario);
    banco.id = dados.id
    if (usuario != null && banco != null){
        const result = await bancoController.update(banco);
        res.json({result:'Ok'});
    }else{
        res.json(null);
    }
})

//Deleta Banco
routerBanco.delete('/:idBanco', async (req, res) => {
    const {idBanco} = req.params;
    if (idBanco != null || idBanco != ''){
        const result = await bancoController.delete(idBanco);
        res.json(result);
    }else{
        res.json(null);
    }
})

routerBanco.get('/checkcartao/:idBanco', async (req, res) => {
    const {idBanco} = req.params;
    if(idBanco != null || idBanco != ''){
        const result = await bancoController.checkCartao(idBanco);
        if (result != null){
            if(result > 0){
                res.json(true);
            }else{
                res.json(false);
            }
        }else{
            res.json(null);
        }
    }else{
        res.json(null);
    }
})