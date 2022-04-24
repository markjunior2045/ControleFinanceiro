import { Injectable } from "@angular/core";
import { Usuario } from "../model/usuario.model";
import { DataService } from "./dataService";

@Injectable({
    providedIn: 'root'
})

export class UsuarioService{
    baseURL:string;
    
    constructor(private _dataservice:DataService){
        this.baseURL = 'http://localhost:3000/'
     }

    cadastraUsuario(usuario:Usuario):Promise<void>{
        return this._dataservice.doPost(this.baseURL + 'usuario', usuario) as Promise<void>;
    }
};