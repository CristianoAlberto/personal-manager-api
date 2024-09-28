import { sign, decode, verify, JwtPayload } from "jsonwebtoken"

export class Token {
  createToken(value: string): string {
    const token = sign({ value }, process.env.TOKEN as string, {
      expiresIn: 2 * 24 * 60 * 60
    })
    return token;
  }
  decryptoToken(token: string) {
    const decToken = decode(token)
    return decToken
  }
  verifyToken(token: string): string | JwtPayload {
    return verify(token, process.env.TOKEN as string)
  }
}