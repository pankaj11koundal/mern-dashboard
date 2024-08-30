import express from "express";
import { getNews } from '../controllers/general.js';
import { getList } from '../controllers/general.js';
import { getGeography } from '../controllers/general.js'

const router = express.Router();

router.get('/news', getNews);
router.get('/list', getList);
router.get('/geography', getGeography);

export default router;