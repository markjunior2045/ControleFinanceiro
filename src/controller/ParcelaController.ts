import { AppDataSource } from "../data-source";
import { Parcela } from "../entity/Parcela";

const database = AppDataSource;

export class ParcelaController{
    async salvar(parcela: Parcela){
        const parcelaSalva = await database.manager.save(parcela);
        return parcelaSalva;
    }

    async getAll(){
        const parcelas = await database.manager.find(Parcela);
        return parcelas;
    }

    async getById(id: string){
        let parcela: Parcela;
        if (id != null || id != "") {
            parcela = await database.manager.findOneBy(Parcela,{id: id});
        }else{
            parcela = null;
        }
        return parcela;
    }
}