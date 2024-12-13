import { addNewCollection, getCollections } from '../controllers/profileController.js';
import express from 'express';
const router = express.Router();

router.post('/collections/add', addNewCollection);

router.get('/collections/ofUser/:id', getCollections);

export default router;