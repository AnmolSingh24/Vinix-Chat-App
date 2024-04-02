import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";
import { createGroup } from "../controllers/group.controller.js";

const router = express.Router();

router.get("/", protectRoute , getUsersForSidebar);
router.post("/groups", protectRoute , createGroup);

export default router;