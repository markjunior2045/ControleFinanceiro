import { Router } from 'express';
import { _TransacaoService } from '../services/_transacaoService';

export const routerTransacao = Router();
const _transacaoService = new _TransacaoService();

//Salvar Transação
routerTransacao.post('/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const body = req.body;

    await _transacaoService.adicionaTransacao(idUsuario,body).then(result => {
        if(result){
            res.status(200).json({ message: 'Sucesso' });
        }else{
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    }).catch(error => res.status(100).json({message: 'Erro ao adicionar transacao'}));
})

//GetById Transacao
routerTransacao.get('/:idTransacao', async (req, res) => {
    const { idTransacao } = req.params;
    await _transacaoService.retornaTransacaoPorId(idTransacao).then(result => {
        if (result != null){
            res.json(result);
        }else{
            res.json(null);
        }
    }).catch(error => res.json(error));
})

//Get por mes
routerTransacao.get('/:idUsuario/:mes', async (req, res) => {
    const { idUsuario } = req.params;
    const { mes } = req.params;
    await _transacaoService.retornaTransacaoFiltroPorMes(idUsuario,parseInt(mes)).then(result => {
        if(result != null){
            res.json(result);
        }else{
            res.json(null);
        }
    }).catch(error => res.json(error));
})

//Get Soma por mes
routerTransacao.get('/total/mes/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    await _transacaoService.retornaTotalPorMes(idUsuario).then(result => {
        if(result != null){
            res.json(result);
        }else{
            res.json(null);
        }
    }).catch(error => res.json(error));
})

//Atualiza Transação
routerTransacao.put('/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const body = req.body;
    await _transacaoService.atualizaTransacao(idUsuario,body).then(result =>{
        if(result){
            res.json(result);
        }else{
            res.json(null);
        }
    }).catch(error => res.json(error));
})

//DeletaTransação
routerTransacao.delete('/:idTransacao', async (req, res) => {
    const { idTransacao } = req.params;
    await _transacaoService.deletaTransacao(idTransacao).then(result => {
        if(result){
            res.json(result);
        }else{
            res.json(false);
        }
    }).catch(error => res.json(error));
})