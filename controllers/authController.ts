import { type Request, type Response } from "express"
import { LoginValidatorSchema, registerValidatorSchema } from "../validations/auth.validator"
import { authLoginService, authRegisterService } from "../services/authService"

export const register = async (req: Request, res: Response) => {
    const { error, value } = registerValidatorSchema.validate(req.body)
    if (error) {
        res.status(400).json({ error: error.message })
        return;
    }
    const user = await authRegisterService(value)
    if (!user) {
        res.status(400).json({ error: "Utilisateur déja inscrit" })
        return
    }

    res.status(201).json({ message: "Compte crée" })
}


export async function login(req: Request, res: Response) {
    const { error, value } = LoginValidatorSchema.validate(req.body)
    if (error) {
        res.status(400).json({ error: error.message })
        return;
    }

    const jwtToken = await authLoginService(value)
    if(!jwtToken) {
        res.status(400).json({ error: "Identifiant invalide" })
         return;
    }
    res.json({token : jwtToken})
}