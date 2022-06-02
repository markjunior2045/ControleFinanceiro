import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';
import {conectarNoBd} from './config/db';
import { routerUsuario } from './controller/usuarioController';
import { routerTransacao } from './controller/transacaoController';
import { routerCartao } from './controller/cartaoController';
import { routerBanco } from './controller/bancoController';
import { routerTag } from './controller/tagController';

//cria a aplicação
export const app = express();

//libera o acesso aos serviços
app.use(cors());

//permite receber/enviar JSON
app.use(bodyParser.json());

//Configura os logs
app.use(logger('dev'));

//Conectar no banco
conectarNoBd();

//Rotas
app.use('/banco', routerBanco);
app.use('/cartao', routerCartao);
app.use('/transacao', routerTransacao);
app.use('/usuario', routerUsuario);
app.use('/tag', routerTag);
app.use('/',(req,res) => res.send('API Controle Financeiro'));