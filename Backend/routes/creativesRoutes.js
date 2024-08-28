import { addCreative, getAllCreatives, updateCreative, deleteCreative, getCreative, likeCreative } from '../controllers/creativesController.js';
import express from 'express';
const router = express.Router();

router.post('/add', addCreative);

router.post('/like', likeCreative);

router.get('/getAll', getAllCreatives);

router.get('/get/:id', getCreative);

router.put('/update/:id', updateCreative);

router.delete('/delete/:id', deleteCreative);

export default router;