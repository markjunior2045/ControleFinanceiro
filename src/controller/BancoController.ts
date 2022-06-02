import { Router } from 'express';
import { _BancoService } from '../services/_bancoService';

export const routerBanco = Router();
const _bancoService = new _BancoService()

//Salvar Banco
routerBanco.post('/:idUsuario', async (req, res) => {
    const body = req.body;
    const { idUsuario } = req.params;
    await _bancoService.adicionaBanco(idUsuario,body).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

//GetById Banco
routerBanco.get('/:idBanco', async (req, res) => {
    const {idBanco} = req.params;
    await _bancoService.retornaBancoPorId(idBanco).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

//Get Bancos do Usuário
routerBanco.get('/usuario/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    await _bancoService.retornaBancosDoUsuario(idUsuario).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

//Atualiza Banco
routerBanco.put('/:idUsuario',async (req, res) => {
    const {idUsuario} = req.params;
    const body = req.body;
    await _bancoService.atualizaBanco(idUsuario,body).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

//Deleta Banco
routerBanco.delete('/:idBanco', async (req, res) => {
    const {idBanco} = req.params;
    await _bancoService.deletaBanco(idBanco).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})

//Check cartao
routerBanco.get('/checkcartao/:idBanco', async (req, res) => {
    const {idBanco} = req.params;
    await _bancoService.verificaBancoTemCartao(idBanco).then(result => {
        res.json(result);
    }).catch(error => {res.json(error)});
})