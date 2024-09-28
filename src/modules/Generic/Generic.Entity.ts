import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ObjectIdColumn, ObjectId } from "typeorm";

export class Generic {
    @ObjectIdColumn()
    _id: ObjectId;
    @Column()
    name: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    deletedAt: Date | null;

    constructor(_id: ObjectId, name: string, createdAt: Date, updatedAt: Date, deletedAt: Date) {
        this._id = _id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}