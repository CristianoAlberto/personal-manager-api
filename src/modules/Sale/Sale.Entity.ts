import { Entity, Column, ObjectId } from "typeorm";
import { Generic } from "../Generic/Generic.Entity";
/**
 * O operation vai receber um boolean onde 
 * true = entrada
 * false = saida
 */

@Entity('Sale')
export class Sale extends Generic {
    @Column()
    description: string;
    @Column()
    reference: string;
    @Column()
    amount: number;
    @Column()
    price: number;
    @Column()
    deliveryValue: number;
    @Column()
    total: number;
    @Column()
    operation: boolean;
    constructor(_id: ObjectId,
        name: string,
        description: string,
        reference: string,
        amount: number,
        price: number,
        total: number,
        operation: boolean,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date) {
        super(_id, name, createdAt, updatedAt, deletedAt);
        this.description = description;
        this.reference = reference;
        this.amount = amount;
        this.price = price;
        this.total = total;
        this.operation = operation;
    }
}