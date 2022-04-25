import { Injectable } from "@angular/core";
import { Banco } from "../model/banco.model";
import { DataService } from "./dataService";

@Injectable({
    providedIn: 'root'
})

export class BancoService{

    constructor(private _dataservice: DataService,){ }

    cadastraContaCorrente(banco: Banco):Promise<void>{
        return this._dataservice.doPost('banco', banco) as Promise<void>;
    }
};