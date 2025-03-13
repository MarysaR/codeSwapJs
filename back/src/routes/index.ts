import { Router } from "express";
import { testLogic } from "../controllers/testController";

const router = Router();

router.get("/test", testLogic);

export default router;
