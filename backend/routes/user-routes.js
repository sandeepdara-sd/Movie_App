import express from "express"
import {getAllUsers, getById, login, signup}  from "../controllers/user-controller.js"

const router = express.Router();

router.get("/", getAllUsers)
router.post("/signup",signup)
router.post("/login",login)
router.post("/login",login)
router.get("/:id", getById);


export default router;