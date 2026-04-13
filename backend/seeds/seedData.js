const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

dotenv.config();

const users = [
  {
    name: 'Alex Morgan',
    email: 'alex@jobportal.com',
    password: 'Password123!',
    role: 'user',
  },
  {
    name: 'Taylor Reed',
    email: 'taylor@startupx.com',
    password: 'Password123!',
    role: 'employer',
  },
  {
    name: 'Jordan Fields',
    email: 'jordan@recruitco.com',
    password: 'Password123!',
    role: 'employer',
  },
  {
    name: 'Admin User',
    email: 'admin@jobportal.com',
    password: 'AdminPassword123!',
    role: 'admin',
  },
];

const jobs = [
  {
    title: 'Senior Frontend Engineer',
    company: 'StartupX',
    description:
      'Build accessible, high-performance web experiences using React, TypeScript, and modern frontend tooling.',
  },
  {
    title: 'Product Designer',
    company: 'RecruItCo',
    description:
      'Design user-first web products with strong visual systems, collaboration, and a polished UI/UX workflow.',
  },
  {
    title: 'Full Stack Developer',
    company: 'StartupX',
    description:
      'Work across frontend and backend systems to ship production-ready features for fast-scaling teams.',
  },
  {
    title: 'Technical Writer',
    company: 'RecruItCo',
    description:
      'Translate product requirements into clear documentation, onboarding guides, and customer-facing content.',
  },
];

const seedData = async () => {
  try {
    await connectDB();

    await Application.deleteMany();
    await Job.deleteMany();
    await User.deleteMany();

    const createdUsers = [];
    for (const user of users) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(user.password, salt);
      const userDoc = await User.create({
        ...user,
        password: hashed,
      });
      createdUsers.push(userDoc);
    }

    const employerOne = createdUsers.find((u) => u.email === 'taylor@startupx.com');
    const employerTwo = createdUsers.find((u) => u.email === 'jordan@recruitco.com');
    const applicant = createdUsers.find((u) => u.email === 'alex@jobportal.com');

    const createdJobs = [];
    const jobListings = [
      { ...jobs[0], postedBy: employerOne._id },
      { ...jobs[1], postedBy: employerTwo._id },
      { ...jobs[2], postedBy: employerOne._id },
      { ...jobs[3], postedBy: employerTwo._id },
    ];

    for (const job of jobListings) {
      const createdJob = await Job.create(job);
      createdJobs.push(createdJob);
    }

    const applications = [
      { jobId: createdJobs[0]._id, applicantId: applicant._id, status: 'pending' },
      { jobId: createdJobs[1]._id, applicantId: applicant._id, status: 'reviewed' },
    ];

    await Application.insertMany(applications);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedData();
