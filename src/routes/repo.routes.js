import { Router } from "express";
import { getPdf } from "../controllers/repo.controllers.js";

const router = Router()

router.route('/repoGen').get(getPdf)

export default router