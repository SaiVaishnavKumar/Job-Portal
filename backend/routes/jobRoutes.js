const express = require('express');
const router = express.Router();
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/').get(getJobs).post(protect, authorize('employer', 'admin'), createJob);
router.route('/:id').get(getJobById).put(protect, authorize('employer', 'admin'), updateJob).delete(protect, authorize('employer', 'admin'), deleteJob);

module.exports = router;
