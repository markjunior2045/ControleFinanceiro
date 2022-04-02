import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";

const database = AppDataSource;

export class UsuarioController{
    async salvar(usuario: Usuario){
        const usuariosalvo = await database.manager.save(usuario);
        return usuariosalvo;
    }

    async getAll(){
        const usuarios = await database.manager.find(Usuario);
        return usuarios;
    }

    async getById(id: string){
        const usuario = await database.manager.findOneBy(Usuario,{id: id});
        return usuario;
    }
}