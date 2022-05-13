import { Injectable } from "@angular/core";
import { Guid } from "../model/guid.model";
import { Tag } from "../model/tag.model";
import { Usuario } from "../model/usuario.model";
import { DataService } from "./dataService";

@Injectable({
    providedIn: 'root'
})

export class TagService{
    constructor(private _dataservice: DataService){

    }

    cadastraTag(idUsuario:Guid,tag:Tag):Promise<void>{
        return this._dataservice.doPost('tag/' + idUsuario,tag) as Promise<void>;
    }

    getTags(idUsuario: Guid):Promise<Usuario[]>{
        return this._dataservice.get('tag/usuario/' + idUsuario) as Promise<Usuario[]>;
    }

    deleteTag(idTag: Guid):Promise<void>{
        return this._dataservice.delete('tag/' + idTag) as Promise<void>;
    }

    atualizaTag(idUsuario:Guid, tag:Tag):Promise<void>{
        return this._dataservice.doPut('tag/' + idUsuario, tag) as Promise<void>;
    }
}