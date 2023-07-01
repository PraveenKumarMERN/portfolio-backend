import { Request, Router, Response } from "express";
import { PingController } from "../../app/http/controllers/api/PingController";
import { verifyToken } from "../../app/http/middleware/Auth";
import devicesRouter from "./device";
import NotificationRouter from "./notification";
import authRouter from "./auth";
import homeRouter from "./home";
import skillsRouter from "./skills";
import technologyRouter from "./technology";
//ROUTES IMPORT

const router = Router();

router.get("/", PingController.pong);

router.use("/", authRouter);

router.use("/home", homeRouter);

router.use("/technology", technologyRouter);

router.use("/skills", skillsRouter);

router.use("/devices", verifyToken, devicesRouter);

router.use("/notifications", verifyToken, NotificationRouter);

//ROUTERS USE ADD HERE
export default router;
