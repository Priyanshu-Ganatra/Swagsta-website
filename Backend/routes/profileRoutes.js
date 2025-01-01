import express from 'express';
import { updateUserData, addNewCollection, getCollections, removeFromCollection, deleteCollection } from '../controllers/profileController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
const router = express.Router();

router.patch('/data/update', protectRoute, updateUserData);

router.post('/collections/add', protectRoute, addNewCollection);

router.get('/collections', protectRoute, getCollections);

router.delete('/collections/remove/:creativeId/from/:collectionId', protectRoute, removeFromCollection);

router.delete('/collections/delete/:collectionId', protectRoute, deleteCollection);

export default router;