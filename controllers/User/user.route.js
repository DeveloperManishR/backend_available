import express from "express"
import { LoginUser, RegisterUser } from "./user.controller.js"


const app=express.Router()


app.post(`/register`,RegisterUser)
app.post(`/login`,LoginUser)

export default app