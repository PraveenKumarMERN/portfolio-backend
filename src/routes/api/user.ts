import { Router } from "express";
import { RequestValidator } from "../../app/http/middleware/RequestValidator";
import { LoginRequest } from "../../app/http/requests/LoginRequest";
import { AuthController } from "../../app/http/controllers/api/UserAuth/AuthController";
const router = Router();


router.post("/login", RequestValidator(LoginRequest), AuthController.login);
export default router;