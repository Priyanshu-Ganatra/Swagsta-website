import { addProject, getAllProjects, updateProject, deleteProject, getProject, likeProject, addComment } from '../controllers/projectController.js';
import express from 'express';
const router = express.Router();

router.post('/add', addProject);

router.patch('/like', likeProject);

router.get('/getAll', getAllProjects);

router.get('/get/:id', getProject);

router.post('/addCommentOn/:id', addComment);

router.patch('/update/:id', updateProject);

router.delete('/delete/:id', deleteProject);

export default router;