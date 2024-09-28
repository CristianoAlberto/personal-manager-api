import { Column, Entity, ObjectId } from "typeorm";
import { Generic } from "../Generic/Generic.Entity";
@Entity("Product")
export class Product extends Generic {
    @Column()
    reference: string;
    @Column()
    amount: number;
    @Column()
    price: number;
    @Column()
    type: string;
    constructor(_id: ObjectId,
        name: string,
        reference: string,
        amount: number, price: number,
        type: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date) {
        super(_id, name, createdAt, updatedAt, deletedAt);
        this.reference = reference;
        this.amount = amount;
        this.price = price;
        this.type = type;
    }
}