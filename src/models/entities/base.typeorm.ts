import { BaseEntity, Column, PrimaryColumn } from "typeorm";

export abstract class BaseTypeorm extends BaseEntity {

    @Column({nullable: true})
    createdAt: Date


    @Column({nullable: true})
    updateAt: Date
}