import { getData, updateData, uploadData } from '../controllers/contactUsController.js';
import express from 'express';
const router = express.Router();

router.get('/getData', getData);

router.patch('/updateData', updateData);

router.post('/uploadData', uploadData);

export default router;