import {Router} from "express"
import { prisma } from "../lib/prisma"
import { destroy, index, show, store, update } from "../controllers/userController"

const routes = Router()

// *** index
routes.get("/", index)

// *** show
routes.get("/:id", show)

// *** store 
routes.post("/", store)


// *** DESTROY
routes.delete("/:id", destroy )

// *** UPDATE 
routes.put("/:id", update)




export {routes as userRoutes}