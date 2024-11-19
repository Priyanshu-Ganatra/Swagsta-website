import { getAllProjects, addProject, getProject, deleteProject, updateProject } from '../controllers/caseStudiesController.js';
import express from 'express';
const router = express.Router();

router.get('/getAllProjects', getAllProjects);

router.get('/get/:id', getProject);

router.post('/addProject', addProject);

router.patch('/update/:id', updateProject);

router.delete('/delete/:id', deleteProject);

export default router;