import { Router } from "express";
import { getProfile } from "./controllers/get-profile.js";


export const router = Router()

router.get('/users/:id', getProfile)