import express from "express";
import { getOverviewLineChart, getPieChar, getDailyBarChart } from "../controllers/visuals.js";

const router = express.Router();

router.get('/overview', getOverviewLineChart);
router.get('/daily', getDailyBarChart);
router.get('/pie%20chart', getPieChar)

export default router;