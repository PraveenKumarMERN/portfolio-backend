import { Router } from "express";
import { SkillsController } from "../../app/http/controllers/api/skills/skills";
import { verifyToken } from "../../app/http/middleware/Auth";
import { RequestValidator } from "../../app/http/middleware/RequestValidator";
import { SkillsRequest } from "../../app/http/requests/SkillsRequest";

const router = Router();

router.put(
  "/",
  RequestValidator(SkillsRequest),
  verifyToken,
  SkillsController.updateSkills
);
router.get("/", SkillsController.index);

export default router;
