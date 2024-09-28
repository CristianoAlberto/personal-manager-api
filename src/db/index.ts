import { DataSource } from "typeorm"
import { Product } from "../modules/Product/Product.Entity"
export const AppDataSource = new DataSource({
    type: "mongodb",
    database: process.env.MONGO_DB,
    url: process.env.DB_url,
    synchronize: true,
    logging: true,
    entities: [Product],
})
