import {Router} from 'express';

export const routerUsuario = Router();

//Rota padrão
routerUsuario.get('/',(req,res)=>res.send('Usuário'));