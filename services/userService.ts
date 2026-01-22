import { prisma } from "../lib/prisma"

export const userStoreService = async (payload: any) => {
    const { username, email, password } = payload
    return prisma.user.create({ data: { username, email, password } })
}


export const userIndexService = async () => {
     return prisma.user.findMany()
}


export const userShowService = async (id : number) => {
     return prisma.user.findUnique({ where: { id: id } })
}


export const userDestroyService = async (id : number) => {
     return  prisma.user.delete({ where: { id } })
}


export const userUpdateService = async (id : number, data : {email : string}) => {
     return  prisma.user.update({ where: { id }, data: { email : data.email } })
}

