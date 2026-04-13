const asyncHandler = require('express-async-handler');
const Application = require('../models/Application');
const Job = require('../models/Job');

const applyToJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  const existing = await Application.findOne({
    jobId: job._id,
    applicantId: req.user._id,
  });
  if (existing) {
    res.status(400);
    throw new Error('Already applied to this job');
  }

  const application = await Application.create({
    jobId: job._id,
    applicantId: req.user._id,
  });
  res.status(201).json(application);
});

const getApplications = asyncHandler(async (req, res) => {
  const { mine, jobId } = req.query;
  let query = {};

  if (mine === 'true') {
    query.applicantId = req.user._id;
  }

  if (jobId) {
    query.jobId = jobId;
  }

  if (req.user.role === 'employer') {
    const jobs = await Job.find({ postedBy: req.user._id });
    query.jobId = { $in: jobs.map((job) => job._id) };
  }

  const applications = await Application.find(query)
    .populate('jobId', 'title company')
    .populate('applicantId', 'name email');
  res.json(applications);
});

const updateApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  const job = await Job.findById(application.jobId);
  if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('You cannot update this application');
  }

  const { status } = req.body;
  application.status = status || application.status;
  const updated = await application.save();
  res.json(updated);
});

module.exports = { applyToJob, getApplications, updateApplication };
