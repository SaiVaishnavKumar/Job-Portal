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
  const { search, location, category, type, experience } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
      { skills: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }

  if (category) {
    // Map category names to job titles or skills
    const categoryMappings = {
      'IT & Software': ['Software', 'Developer', 'Engineer', 'IT', 'Programming', 'Tech'],
      'Marketing': ['Marketing', 'Digital Marketing', 'SEO', 'Content', 'Social Media'],
      'Finance': ['Finance', 'Accounting', 'Financial', 'Banking', 'Investment'],
      'Operations': ['Operations', 'Operations Manager', 'Process', 'Efficiency'],
      'Sales': ['Sales', 'Business Development', 'Account Manager'],
      'HR': ['HR', 'Human Resources', 'Recruitment', 'Talent'],
      'Design': ['Design', 'UI/UX', 'Graphic', 'Creative'],
      'Content Writing': ['Content', 'Writing', 'Copywriting', 'Editor'],
    };

    if (categoryMappings[category]) {
      query.$or = query.$or || [];
      query.$or.push(
        { title: { $regex: categoryMappings[category].join('|'), $options: 'i' } },
        { skills: { $in: categoryMappings[category].map(skill => new RegExp(skill, 'i')) } }
      );
    }
  }

  if (type) {
    query.type = type;
  }

  if (experience) {
    // Map experience levels to regex patterns
    const experienceMappings = {
      'fresher': /^0-1/,
      'entry': /^1-3/,
      'mid': /^3-5/,
      'senior': /^5-8|^8-10|^10\+/,
    };

    if (experienceMappings[experience]) {
      query.experience = { $regex: experienceMappings[experience] };
    }
  }

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
