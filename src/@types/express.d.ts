declare namespace Express {
    export interface Request {
        userId: string
        email: string
        token: string
        file: string
    }
}