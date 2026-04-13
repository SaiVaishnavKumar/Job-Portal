const express = require('express');
const router = express.Router();
const { applyToJob, getApplications, updateApplication } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:jobId', protect, applyToJob);
router.get('/', protect, getApplications);
router.put('/:id', protect, updateApplication);

module.exports = router;
