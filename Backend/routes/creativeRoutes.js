import express from 'express';
const router = express.Router();
import { addCreative, likeCreative, getAllCreatives, getCreative, updateCreative, deleteCreative, addComment, addToCollection } from '../controllers/creativeController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

router.post('/add', addCreative);

router.get('/getAll', getAllCreatives);

router.get('/get/:id', getCreative);

router.post('/addCommentOn/:id', protectRoute, addComment);

router.post('/addToCollection/:id', protectRoute, addToCollection);

router.patch('/like/:id', protectRoute, likeCreative);

router.patch('/update/:id', updateCreative);

router.delete('/delete/:id', deleteCreative);

export default router;