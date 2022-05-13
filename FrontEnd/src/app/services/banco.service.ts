import { Injectable } from "@angular/core";
import { Banco } from "../model/banco.model";
import { Guid } from "../model/guid.model";
import { Usuario } from "../model/usuario.model";
import { DataService } from "./dataService";

@Injectable({
    providedIn: 'root'
})

export class BancoService{

    constructor(private _dataservice: DataService,){ }

    cadastraBanco(idUsuario:Guid, banco: Banco):Promise<void>{
        return this._dataservice.doPost('banco/' + idUsuario, banco) as Promise<void>;
    };

    getBancos(idUsuario: Guid):Promise<Usuario[]>{
        return this._dataservice.get('banco/usuario/' + idUsuario) as Promise<Usuario[]>;
    };

    checkCartao(idBanco: Guid):Promise<boolean>{
        return this._dataservice.get('banco/checkcartao/' + idBanco) as Promise<boolean>;
    }

    deleteBanco(idBanco: Guid):Promise<void>{
        return this._dataservice.delete('banco/' + idBanco) as Promise<void>;
    }

    atualizaBanco(idUsuario:Guid, banco:Banco):Promise<void>{
        return this._dataservice.doPut('banco/' + idUsuario, banco) as Promise<void>;
    }
};