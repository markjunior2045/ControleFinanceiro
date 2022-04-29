import { Injectable } from "@angular/core";
import { Transacao } from "../model/transacao.model";
import { DataService } from "./dataService";

@Injectable({
    providedIn: 'root'
})
export class TransacaoService {
    
    constructor(private _dataservice: DataService){ }

    getAllTransacao():Promise<Transacao[]> {
        return this._dataservice.get('transacao') as Promise<Transacao[]>
    }
}