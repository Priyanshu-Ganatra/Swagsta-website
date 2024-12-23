import { addNewCollection, getCollections, removeFromCollection, deleteCollection } from '../controllers/profileController.js';
import express from 'express';
const router = express.Router();

router.post('/collections/add', addNewCollection);

router.get('/collections/ofUser/:id', getCollections);

router.delete('/collections/remove/:creativeId/from/:collectionId', removeFromCollection);

router.delete('/collections/delete/:collectionId', deleteCollection);

export default router;