import express from "express"
import {userRoutes} from "./routes/userRoutes"
import {authRouter} from "./routes/authRoutes"

const app = express()

app.use(express.json())

app.use( "/users", userRoutes)
app.use("/api/v1/auth", authRouter)

app.listen(3000, () => {
    console.log("http://localhost:3000");
})