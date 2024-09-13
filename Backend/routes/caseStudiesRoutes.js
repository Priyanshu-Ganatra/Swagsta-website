import { getAllProjects, addProject } from '../controllers/caseStudiesController.js';
import express from 'express';
const router = express.Router();

router.get('/getAllProjects', getAllProjects);

router.post('/addProject', addProject);

export default router;