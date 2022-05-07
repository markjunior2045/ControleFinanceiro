import {Router} from 'express';
import { UsuarioController } from '../controller/UsuarioController';
import { Usuario } from '../entity/Usuario';

export const routerUsuario = Router();
const usuarioController = new UsuarioController();

//Salvar Usuario
routerUsuario.post('/', async (req, res) => {
    const dados = req.body;
    const usuario = new Usuario(dados.email, dados.nome, dados.sobrenome, dados.senha, dados.salario, dados.porcentagem, dados.valorReservado);
    const usuarioSalvo = await usuarioController.salvar(usuario);
    res.json(usuarioSalvo);
})

//login
routerUsuario.post('/login', async (req, res) => {
    const dados = req.body;
    const usuarioId = await usuarioController.login(dados.email,dados.senha);
    res.json(usuarioId);
})

//GetAll Usuários
routerUsuario.get('/', async (req, res) => {
    const usuarios = await usuarioController.getAll();
    res.json(usuarios);
})

//GetById Usuário
routerUsuario.get('/:idUsuario', async (req, res) => {
    const {idUsuario} = req.params;
    const usuario = await usuarioController.getById(idUsuario);
    res.json(usuario);
})

//Get transacoes do Usuario
routerUsuario.get('/transacoes/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const transacoes = await usuarioController.getTransacoesDoUsuario(idUsuario);
    res.json(transacoes);
})

//Update Usuário
routerUsuario.put('/', async (req, res) => {
    const dados = req.body;
    const usuario = new Usuario(dados.email,dados.nome,dados.sobrenome, dados.senha, dados.salario, dados.porcentagem, dados.valorReservado);
    usuario.id = dados.id;
    const result = await usuarioController.update(usuario);
    res.json(result);
})