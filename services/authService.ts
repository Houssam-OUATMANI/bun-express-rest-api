import { prisma } from "../lib/prisma"
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


type RegisterPayload = {
    username: string,
    email: string,
    password: string
}

type LoginPayload = Omit<RegisterPayload, 'username'>



export const authRegisterService = async (payload: RegisterPayload) => {
    // *** Verifier si le user est dans la bdd
    const { email, password, username } = payload
    const user = await prisma.user.findUnique({ where: { email } })
    if (user) return null
    // *** HAsh le mdp
    const hash = await bcrypt.hash(password, 10)
    // *** Mettre tout dans la bdd
    return prisma.user.create({ data: { username, email, password: hash } })
}


export const authLoginService = async (payload: LoginPayload) => {
    const { email, password } = payload
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return null
    const match = await bcrypt.compare(password, user.password )
    if(!match) return null

    // *** Generer un JWT TOKEN D'access

    const data = {
        username : user.username,
        email :user.email
    }

    return jwt.sign(data, "SECRET_KEY", {expiresIn : '2h'})

}