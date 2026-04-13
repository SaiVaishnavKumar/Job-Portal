const asyncHandler = require('express-async-handler');
const Job = require('../models/Job');
const Application = require('../models/Application');

const createJob = asyncHandler(async (req, res) => {
  const { title, description, company } = req.body;
  if (!title || !description || !company) {
    res.status(400);
    throw new Error('Title, description, and company are required');
  }

  const job = await Job.create({
    title,
    description,
    company,
    postedBy: req.user._id,
  });
  res.status(201).json(job);
});

const getJobs = asyncHandler(async (req, res) => {
  const { search, company, postedBy } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  if (company) query.company = { $regex: company, $options: 'i' };
  if (postedBy) query.postedBy = postedBy;

  const jobs = await Job.find(query)
    .populate('postedBy', 'name email role')
    .sort({ createdAt: -1 });
  res.json(jobs);
});

const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate('postedBy', 'name email role');
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }
  res.json(job);
});

const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }
  if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('You cannot edit this job');
  }

  const { title, description, company } = req.body;
  job.title = title || job.title;
  job.description = description || job.description;
  job.company = company || job.company;

  const updatedJob = await job.save();
  res.json(updatedJob);
});

const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }
  if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('You cannot delete this job');
  }

  await Application.deleteMany({ jobId: job._id });
  await job.remove();
  res.json({ message: 'Job removed' });
});

module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob };
