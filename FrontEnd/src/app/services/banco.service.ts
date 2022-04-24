import { Injectable } from "@angular/core";
import { Banco } from "../model/banco.model";
import { DataService } from "./dataService";

@Injectable({
    providedIn: 'root'
})

export class BancoService{
    baseUrl: string;

    constructor(private _dataservice: DataService,){ 
        this.baseUrl = 'http://localhost:3000/'
    }

    cadastraContaCorrente(banco: Banco):Promise<void>{
        return this._dataservice.doPost(this.baseUrl + 'banco', banco) as Promise<void>;
    }
};