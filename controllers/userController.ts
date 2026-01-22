import { type Request, type Response } from "express"
import { prisma } from "../lib/prisma"
import { userStoreService, userIndexService, userShowService, userDestroyService, userUpdateService } from "../services/userService"




export const index = async (req: Request, res: Response) => {
    const users = await userIndexService()
    res.json(users)
}

export const show = async (req: Request, res: Response) => {
    const id = +req.params.id!
    const user = await userShowService(id)

    if (!user) {
        res.status(404).json({ error: `user with id ${id} is not found` })
        return;
    }

    res.json(user)

}


export const store = async (req: Request, res: Response) => {
    const user = await userStoreService(req.body)
    res.status(201).json(user)
}



export const destroy = async (req: Request, res: Response) => {
    const id = +req.params.id!
    const user = await userShowService(id)

    if (!user) {
        res.status(404).json({ error: `user with id ${id} is not found` })
        return;
    }

    await userDestroyService(id)
    res.json({ success: "user deleted" })
}



export const update = async (req: Request, res: Response) => {
    const id = +req.params.id!
    const { username, email, password } = req.body
    await userUpdateService(id, { email })
    res.json({ success: "user updated" })
}