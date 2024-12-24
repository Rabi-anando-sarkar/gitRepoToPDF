import { Router } from "express";

const router = Router()

router.route('/repoGen').get(generateRepo)

export default router