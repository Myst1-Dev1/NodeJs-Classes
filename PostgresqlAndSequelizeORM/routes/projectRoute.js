const express = require('express');
const { createProject, getAllProjects, getProjectById, updateProject, deleteProject } = require('../controllers/projectController');
const { authentication, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.post('/', authentication, restrictTo('1'), createProject);
router.get('/', authentication, restrictTo('1'), getAllProjects);
router.get('/:id', authentication, restrictTo('1'), getProjectById);
router.put('/:id', authentication, restrictTo('1'), updateProject);
router.delete('/:id', authentication, restrictTo('1'), deleteProject);

module.exports = router;