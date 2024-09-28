import "dotenv/config"
import "reflect-metadata"
import { AppDataSource } from "./db"
import express, { Request, Response } from "express"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import cors from "cors"

import { router as product } from "./modules/Product/Product.Router"

const app = express()

app.use(helmet({ crossOriginResourcePolicy: false, }))
app.use(express())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}))
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Tempo de requisição
    max: 100000, // Maximo de requisição por ip
    validate: {
        trustProxy: false,
        xForwardedForHeader: false
    }
})
app.use(limiter)

AppDataSource.initialize()
    .then(async () => {
        // await seedRoler()
        console.log("BD inicializado!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

const version = 'api/v1'

app.get(`/${version}/`, (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'success',
    })
})

app.use(`/${version}/product`, product)

app.listen(Number(process.env.PORT) | 3000, () => {
    console.log("Rodando api ", process.env.PORT || 3000)
});