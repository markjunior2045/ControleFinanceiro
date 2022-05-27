import { Injectable } from "@angular/core";
import { Guid } from "../model/guid.model";
import { qtdTipos, Tag } from "../model/tag.model";
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

    countTipos(idUsuario: Guid):Promise<qtdTipos[]>{
        return this._dataservice.get('tag/count/tipo/' + idUsuario) as Promise<qtdTipos[]>;
    }

    deleteTag(idTag: Guid):Promise<void>{
        return this._dataservice.delete('tag/' + idTag) as Promise<void>;
    }

    atualizaTag(idUsuario:Guid, tag:Tag):Promise<void>{
        return this._dataservice.doPut('tag/' + idUsuario, tag) as Promise<void>;
    }

    checkTag(idTag:Guid):Promise<boolean>{
        return this._dataservice.get('tag/checktag/' + idTag) as Promise<boolean>;
    }

    limpaTag(idTag:Guid):Promise<boolean>{
        return this._dataservice.get('tag/limpaTag/' + idTag) as Promise<boolean>;
    }
}