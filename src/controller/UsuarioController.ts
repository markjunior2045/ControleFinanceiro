import {Router} from 'express';
import { UsuarioRepository } from '../repository/UsuarioRepository';
import { Usuario } from '../models/Usuario';
import { _UsuarioService } from '../services/_usuarioService';

export const routerUsuario = Router();
const _usuarioService = new _UsuarioService();

//Salvar Usuario
routerUsuario.post('/', async (req, res) => {
    const body = req.body;
    await _usuarioService.adicionaUsuario(body).then(result =>{
        res.json(result);
    }).catch(error => {res.json(error)});
})

//login
routerUsuario.post('/login', async (req, res) => {
    const body = req.body;
    await _usuarioService.login(body).then(result =>{
        res.json(result);
    }).catch(error => {res.json(error)});
})

//GetById Usuário
routerUsuario.get('/:idUsuario', async (req, res) => {
    const {idUsuario} = req.params;
    await _usuarioService.retornaUsuarioPorId(idUsuario).then(result =>{
        res.json(result);
    }).catch(error => {res.json(error)});
})

//Get transacoes do Usuario
// routerUsuario.get('/transacoes/:idUsuario', async (req, res) => {
//     const { idUsuario } = req.params;
//     const transacoes = await usuarioRepository.getTransacoesDoUsuario(idUsuario);
//     res.json(transacoes);
// })

//Update Usuário
routerUsuario.put('/', async (req, res) => {
    const body = req.body;
    await _usuarioService.atualizaUsuario(body).then(result =>{
        res.json(result);
    }).catch(error => {res.json(error)});
})

routerUsuario.get('/email/:email', async (req, res) => {
    const {email} = req.params;
    await _usuarioService.verificaEmailJaCadastrado(email).then(result =>{
        res.json(result);
    }).catch(error => {res.json(error)});
})