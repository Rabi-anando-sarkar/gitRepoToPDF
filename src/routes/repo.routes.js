import { Router } from "express";
import { getPdf } from "../controllers/repo.controllers.js";

const router = Router()

router.route('/repoGen').post(getPdf)

export default router