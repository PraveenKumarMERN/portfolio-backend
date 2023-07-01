import { Router } from "express";
import { SkillsController } from "../../app/http/controllers/api/skills/skills";
import { TechnologyController } from "../../app/http/controllers/api/technology/technology";
import { verifyToken } from "../../app/http/middleware/Auth";
import { RequestValidator } from "../../app/http/middleware/RequestValidator";
import { TechnologyRequest } from "../../app/http/requests/TechnologyRequest";

const router = Router();

router.post(
  "/",
  RequestValidator(TechnologyRequest),
  verifyToken,
  TechnologyController.addTechnology
);
router.get("/", TechnologyController.index);

export default router;
