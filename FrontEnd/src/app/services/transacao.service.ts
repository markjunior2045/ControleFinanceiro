import { Injectable } from "@angular/core";
import { Guid } from "../model/guid.model";
import { Transacao } from "../model/transacao.model";
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

    getTransacoesUsuario(idUsuario: Guid):Promise<Usuario[]> {
        return this._dataservice.get('usuario/transacoes/' + idUsuario) as Promise<Usuario[]>
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