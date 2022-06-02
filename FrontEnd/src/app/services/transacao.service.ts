import { Injectable } from "@angular/core";
import { Guid } from "../model/guid.model";
import { TotalMes, Transacao } from "../model/transacao.model";
import { Usuario } from "../model/usuario.model";
import { DataService } from "./dataService";

@Injectable({
    providedIn: 'root'
})
export class TransacaoService {
    
    constructor(private _dataservice: DataService){ }

    getAllTransacao():Promise<Transacao[]> {
        return this._dataservice.get('transacao') as Promise<Transacao[]>
    }

    atualizaTransacao(idUsuario: Guid, transacao: Transacao):Promise<void> {
        return this._dataservice.doPut('transacao/' + idUsuario, transacao) as Promise<void>;
    }

    getSomaMesTransacao(idUsuario:Guid):Promise<TotalMes[]>{
        return this._dataservice.get('transacao/total/mes/' + idUsuario) as Promise<TotalMes[]>;
    }

    getTransacoesPorMes(idUsuario:Guid,mes:number):Promise<Transacao[]>{
        return this._dataservice.get('transacao/' + idUsuario + '/' + mes) as Promise<Transacao[]>
    }

    adicionaTransacao(idUsuario: Guid, transacao: Transacao):Promise<void>{
        return this._dataservice.doPost('transacao/' + idUsuario,transacao) as Promise<void>;
    }

    deletaTransacao(idTransacao: Guid):Promise<void>{
        return this._dataservice.delete('transacao/' + idTransacao) as Promise<void>;
    }
}