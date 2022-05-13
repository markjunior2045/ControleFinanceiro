import { AppDataSource } from "../data-source";
import { Tag } from "../entity/Tag";
import { Usuario } from "../entity/Usuario";

const database = AppDataSource;

export class TagController {
    async salvar(tag: Tag){
        const tagSalva = await database.manager.save(tag);
        return tagSalva;
    }

    async getTagsDoUsuario(idUsuario: string){
        const tags = await database.manager.find(Usuario,{
            relations: {
                tag: true
            },
            where: {
               id: idUsuario 
            },
        })
        return tags;
    }

    async getById(id: string){
        let tag: Tag;
        if (id != null || id != "") {
            tag = await database.manager.findOneBy(Tag,{id: id});
        }else{
            tag = null;
        }
        return tag;
    }

    async update(tag: Tag){
        let tagSalva: Tag;
        if(tag != null){
            tagSalva = await database.manager.save(tag);
        }else{
            tagSalva = null;
        }
        return tagSalva;
    }

    async delete(id: string){
        if (id != null || id != ''){
            return await database.manager.delete(Tag, id);
        }else{
            return null;
        }
    }
}