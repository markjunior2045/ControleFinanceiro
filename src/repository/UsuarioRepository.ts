import { AppDataSource } from "../data-source";
import { Usuario } from "../models/Usuario";

const database = AppDataSource;

export class UsuarioRepository{
    async salvar(usuario: Usuario){
        const usuariosalvo = await database.manager.save(usuario);
        return usuariosalvo;
    }

    async getAll(){
        const usuarios = await database.manager.find(Usuario);
        return usuarios;
    }

    async getById(id: string){
        let usuario: Usuario;
        if (id != null || id != "") {
            usuario = await database.manager.findOneBy(Usuario,{id: id});
        }else{
            usuario = null;
        }
        return usuario;
    }

    async update(usuario: Usuario){
        let usuarioSalvo:Usuario;
        if(usuario != null){
            usuarioSalvo = await database.manager.save(usuario);
        }else{
            usuarioSalvo = null
        }
        return usuarioSalvo;
    }

    async getTransacoesDoUsuario(idUsuario: string){
        const transacoes = await database.manager.find(Usuario,{
            relations: {
                transacoes: {
                    banco: true,
                    cartao: true,
                    tag: true
                }
            },
            where: {
               id: idUsuario 
            }
        })
        return transacoes;
    }

    async login(email: string, senha:string){
        const usuario = await database.manager.findOneBy(Usuario,{email:email,senha:senha});
        if (usuario != null)
            return usuario.id;
        else
            return null
    }

    async checkEmail(email: string){
        const temEmail = await database.manager.count(Usuario, {
            where: {
                email: email
            }
        })
        return temEmail;
    }
}