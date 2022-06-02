import { Router } from "express";
import { ParcelaRepository } from "../repository/ParcelaRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { Parcela } from "../models/Parcela";

export const routerParcela = Router();
const usuarioRepository = new UsuarioRepository();
const parcelaRepository = new ParcelaRepository();

//Salvar Parcela
routerParcela.post('/', async (req, res) => {
    const dados = req.body;
    const usuario = await usuarioRepository.getById(dados.idUsuario);
    if (usuario){
        const parcela = new Parcela(dados.valorParcela, dados.numero, dados.dataParcela, dados.transacao);
        const parcelaSalva = await parcelaRepository.salvar(parcela);
        res.json(parcelaSalva);
    } else {
        res.status(404).json({message: 'Usuário não encontrado'});
    }
})

//GetAll Parcela
routerParcela.get('/', async (req, res) => {
    const parcelas = await parcelaRepository.getAll();
    res.json(parcelas)
})

//GetById Parcela
routerParcela.get('/:idParcela', async (req, res) => {
    const {idParcela} = req.params;
    const parcela = await parcelaRepository.getById(idParcela);
    res.json(parcela)
})