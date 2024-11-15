import { getAllProjects, addProject, getProject, deleteProject } from '../controllers/caseStudiesController.js';
import express from 'express';
const router = express.Router();

router.get('/getAllProjects', getAllProjects);

router.get('/get/:id', getProject);

router.post('/addProject', addProject);

router.delete('/delete/:id', deleteProject);

export default router;