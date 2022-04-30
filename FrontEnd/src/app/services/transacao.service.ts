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

    atualizaTransacao(transacao: Transacao):Promise<void> {
        return this._dataservice.doPut('transacao', transacao) as Promise<void>;
    }
}