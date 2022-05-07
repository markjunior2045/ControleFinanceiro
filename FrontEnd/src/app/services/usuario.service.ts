import { Injectable } from "@angular/core";
import { Guid } from "../model/guid.model";
import { Usuario } from "../model/usuario.model";
import { DataService } from "./dataService";

@Injectable({
    providedIn: 'root'
})

export class UsuarioService{
    
    constructor(private _dataservice:DataService){ }

    cadastraUsuario(usuario:Usuario):Promise<void>{
        return this._dataservice.doPost('usuario', usuario) as Promise<void>;
    }

    login(usuario: Usuario):Promise<Guid>{
        return this._dataservice.doPost('usuario/login', usuario) as Promise<Guid>;
    }

    getUsuario(id: Guid):Promise<Usuario>{
        return this._dataservice.get('usuario/' + id) as Promise<Usuario>;
    }

    updateUsuario(usuario:Usuario):Promise<Usuario>{
        return this._dataservice.doPut('usuario', usuario) as Promise<Usuario>;
    }
};