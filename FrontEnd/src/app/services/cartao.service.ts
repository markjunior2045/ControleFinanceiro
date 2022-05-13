import { Injectable } from "@angular/core";
import { Cartao } from "../model/cartao.model";
import { Guid } from "../model/guid.model";
import { Usuario } from "../model/usuario.model";
import { DataService } from "./dataService";

@Injectable({
    providedIn: 'root'
})

export class CartaoService{

    constructor(private _dataservice:DataService){ }

    cadastraCartao(idUsuario:Guid,cartao:Cartao):Promise<void>{
        return this._dataservice.doPost('cartao/' + idUsuario, cartao) as Promise<void>;
    }

    getCartao(idUsuario:Guid):Promise<Usuario[]>{
        return this._dataservice.get('cartao/usuario/' + idUsuario) as Promise<Usuario[]>
    }

    deleteCartao(idCartao:Guid):Promise<void>{
        return this._dataservice.delete('cartao/' + idCartao) as Promise<void>;
    }

    atualizaCartao(idUsuario: Guid, cartao:Cartao):Promise<void>{
        return this._dataservice.doPut('cartao/' + idUsuario, cartao) as Promise<void>;
    }
};