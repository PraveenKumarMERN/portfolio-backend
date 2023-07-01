import { Router } from "express";
import { HomeController } from "../../app/http/controllers/api/home/homeController";
import { verifyToken } from "../../app/http/middleware/Auth";
import { RequestValidator } from "../../app/http/middleware/RequestValidator";
import { HomeRequest } from "../../app/http/requests/HomeRequest";

const router = Router();

router.put(
  "/",
  RequestValidator(HomeRequest),
  verifyToken,
  HomeController.updateHome
);
router.get("/", HomeController.index);

export default router;
