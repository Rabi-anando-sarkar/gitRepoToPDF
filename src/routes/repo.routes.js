import { Router } from "express";
import { getPdf, uploadPdf } from "../controllers/repo.controllers.js";

const router = Router()

router.route('/repoGen').post(getPdf)
router.route('/repoCloud').post(uploadPdf)

export default router