import { getAllProjects, addProject, getProject } from '../controllers/caseStudiesController.js';
import express from 'express';
const router = express.Router();

router.get('/getAllProjects', getAllProjects);

router.get('/get/:id', getProject);

router.post('/addProject', addProject);

export default router;