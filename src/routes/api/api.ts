import { Request, Router, Response } from "express";
import { PingController } from "../../app/http/controllers/api/PingController";
import { verifyToken } from "../../app/http/middleware/Auth";
import userRouter from "./user";
import adminRouter from "./admin";
import devicesRouter from "./device";
import authRouter from "./auth";
//ROUTES IMPORT

const router = Router();

router.get("/", PingController.pong);

router.use("/", authRouter);

router.use("/user",userRouter);

router.use("/admin",adminRouter);

router.use("/devices", verifyToken, devicesRouter);

// router.use("/notifications", verifyToken, NotificationRouter);

//ROUTERS USE ADD HERE

/**
 * 404 api redirects
 */
// router.use(function (req: Request, res: Response) {
//   res.status(404).send({
//     status: false,
//     message: "Not found",
//   });
// });

export default router;
