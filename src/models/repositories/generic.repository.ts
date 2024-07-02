import { BaseEntity, Repository } from "typeorm";
import { BaseTypeorm } from "../entities/base.typeorm";

export abstract class GenericRepository<T extends BaseTypeorm>  {

    private repository: Repository<T>;

    constructor(repo: Repository<T>){
        this.repository = repo;
    }

    async findAll() : Promise<T[]>{
        return this.repository.find();
    }

    async findOneBy(by: any) : Promise<T|null> {
        return this.repository.findOneBy(by);
    }

    async findOneById(id: any) : Promise<T|null> {
        return this.repository.findOneBy(id);
    }

    async removeBy(by: any) : Promise<boolean> {
        const deleteRes =  await this.repository.delete(by);
        if(deleteRes.affected && deleteRes.affected > 0){
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    async save(t: any) : Promise<T> {
        const currentTime = new Date();
        if(!t.id){
            t.createdAt = currentTime;
        }
        t.updateAt = currentTime;
        const obj = await this.repository.save(t);
        return Promise.resolve(obj);
    }

    


}