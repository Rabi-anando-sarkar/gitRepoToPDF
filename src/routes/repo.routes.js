import { Router } from "express";
import { convertToPdf, listAll, saveInDB } from "../controllers/repo.controllers.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/convertToPdf').post(authenticateToken,convertToPdf)
router.route('/saveInDB/:repoId').post(authenticateToken,saveInDB)
router.route('/listRepos').get(authenticateToken,listAll)

export default router