import {Router} from 'express';
import { UsuarioController } from '../controller/UsuarioController';
import { Usuario } from '../entity/Usuario';

export const routerUsuario = Router();
const usuarioController = new UsuarioController();

//Salvar Usuario
routerUsuario.post('/', async (req, res) => {
    const dados = req.body;
    const usuario = new Usuario(dados.email,dados.nome,dados.sobrenome, dados.senha, dados.salario,dados.porcentagem,dados.telefone,dados.datanascimento,dados.cpf);
    const usuarioSalvo = await usuarioController.salvar(usuario);
    res.json(usuarioSalvo);
})


//GetAll Usuários
routerUsuario.get('/', async (req, res) => {
    const usuarios = await usuarioController.getAll();
    res.json(usuarios);
})