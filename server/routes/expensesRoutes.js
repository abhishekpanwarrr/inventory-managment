import { Router } from "express";
import { getExpensesByCategory } from "../controllers/expensesController.js";

const router = Router();

router.get("/", getExpensesByCategory);

export default router;