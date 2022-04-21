import { Router } from "express";
import { ParcelaController } from "../controller/ParcelaController";
import { UsuarioController } from "../controller/UsuarioController";
import { Parcela } from "../entity/Parcela";

export const routerParcela = Router();
const usuarioController = new UsuarioController();
const parcelaController = new ParcelaController();

//Salvar Parcela
routerParcela.post('/', async (req, res) => {
    const dados = req.body;
    const usuario = await usuarioController.getById(dados.idUsuario);
    if (usuario){
        const parcela = new Parcela(dados.valorParcela, dados.numero, dados.dataParcela, dados.transacao);
        const parcelaSalva = await parcelaController.salvar(parcela);
        res.json(parcelaSalva);
    } else {
        res.status(404).json({message: 'Usuário não encontrado'});
    }
})

//GetAll Parcela
routerParcela.get('/', async (req, res) => {
    const parcelas = await parcelaController.getAll();
    res.json(parcelas)
})

//GetById Parcela
routerParcela.get('/:idParcela', async (req, res) => {
    const {idParcela} = req.params;
    const parcela = await parcelaController.getById(idParcela);
    res.json(parcela)
})