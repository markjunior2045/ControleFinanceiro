import { Injectable } from "@angular/core";
import { Usuario } from "../model/usuario.model";
import { DataService } from "./dataService";

@Injectable({
    providedIn: 'root'
})

export class UsuarioService{

    constructor(private _dataservice:DataService){ }

    cadastraUsuario(usuario:Usuario):Promise<void>{
        return this._dataservice.doPost('localhost:3000/usuario', usuario) as Promise<void>;
    }
};