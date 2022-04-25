import { Injectable } from "@angular/core";
import { Cartao } from "../model/cartao.model";
import { DataService } from "./dataService";

@Injectable({
    providedIn: 'root'
})

export class CartaoService{

    constructor(private _dataservice:DataService){ }

    cadastraCartao(cartao:Cartao):Promise<void>{
        return this._dataservice.doPost('cartao', cartao) as Promise<void>;
    }
};