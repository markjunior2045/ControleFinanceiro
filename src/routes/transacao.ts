import { Router } from 'express';
import { TransacaoController } from '../controller/TransacaoController';
import { UsuarioController } from '../controller/UsuarioController';
import { Transacao } from '../entity/Transacao';

export const routerTransacao = Router();
const transacaoController = new TransacaoController();
const usuarioController = new UsuarioController();

routerTransacao.post('/', async(req, res) => {
    const dados = req.body;
    const usuario = await usuarioController.getById(dados.idUsuario);
    if (usuario) {
        const transacao = new Transacao(dados.descricao,dados.valor,dados.metodo,dados.parcelado,dados.data,usuario);
        const transacaoSalva = await transacaoController.salvar(transacao);
        res.json(transacaoSalva);
    } else {
        res.status(404).json({message: 'Usuário não encontrado'})
    }
})