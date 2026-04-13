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
    name: 'Sarah Johnson',
    email: 'sarah@google.com',
    password: 'Password123!',
    role: 'employer',
  },
  {
    name: 'Michael Chen',
    email: 'michael@microsoft.com',
    password: 'Password123!',
    role: 'employer',
  },
  {
    name: 'Priya Sharma',
    email: 'priya@infosys.com',
    password: 'Password123!',
    role: 'employer',
  },
  {
    name: 'Rahul Kumar',
    email: 'rahul@tcs.com',
    password: 'Password123!',
    role: 'employer',
  },
  {
    name: 'Emma Wilson',
    email: 'emma@flipkart.com',
    password: 'Password123!',
    role: 'employer',
  },
  {
    name: 'David Brown',
    email: 'david@swiggy.com',
    password: 'Password123!',
    role: 'employer',
  },
  {
    name: 'Lisa Zhang',
    email: 'lisa@zomato.com',
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
    title: 'Senior Software Engineer',
    company: 'Google',
    description: 'Design and develop large-scale distributed systems. Work with cutting-edge technologies including Kubernetes, Big Data, and Machine Learning. Collaborate with global teams to build products that impact billions of users.',
    location: 'Bangalore, Karnataka',
    salary: '₹25,00,000 - ₹45,00,000 per year',
    experience: '5-8 years',
    skills: ['Java', 'Python', 'Kubernetes', 'Big Data', 'Machine Learning'],
    type: 'Full-time',
  },
  {
    title: 'Product Manager',
    company: 'Microsoft',
    description: 'Drive product strategy and execution for Azure cloud services. Work closely with engineering teams, customers, and stakeholders to define product roadmap and deliver innovative solutions.',
    location: 'Hyderabad, Telangana',
    salary: '₹20,00,000 - ₹35,00,000 per year',
    experience: '3-6 years',
    skills: ['Product Management', 'Azure', 'Cloud Computing', 'Data Analysis'],
    type: 'Full-time',
  },
  {
    title: 'Frontend Developer Intern',
    company: 'Infosys',
    description: 'Build responsive web applications using React and modern JavaScript frameworks. Learn industry best practices and work on real client projects under mentorship.',
    location: 'Pune, Maharashtra',
    salary: '₹15,000 - ₹25,000 per month',
    experience: '0-1 year',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Git'],
    type: 'Internship',
  },
  {
    title: 'Data Scientist',
    company: 'TCS',
    description: 'Analyze large datasets to extract insights and build predictive models. Work with clients across various industries to solve complex business problems using advanced analytics.',
    location: 'Mumbai, Maharashtra',
    salary: '₹18,00,000 - ₹28,00,000 per year',
    experience: '2-5 years',
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
    type: 'Full-time',
  },
  {
    title: 'UI/UX Designer',
    company: 'Flipkart',
    description: 'Create intuitive and beautiful user experiences for e-commerce platforms. Conduct user research, design wireframes, and collaborate with cross-functional teams.',
    location: 'Bangalore, Karnataka',
    salary: '₹12,00,000 - ₹22,00,000 per year',
    experience: '2-4 years',
    skills: ['Figma', 'Sketch', 'User Research', 'Prototyping', 'Design Systems'],
    type: 'Full-time',
  },
  {
    title: 'DevOps Engineer',
    company: 'Swiggy',
    description: 'Build and maintain scalable infrastructure for food delivery platform. Implement CI/CD pipelines, monitor system performance, and ensure high availability.',
    location: 'Gurgaon, Haryana',
    salary: '₹16,00,000 - ₹26,00,000 per year',
    experience: '3-5 years',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
    type: 'Full-time',
  },
  {
    title: 'Marketing Manager',
    company: 'Zomato',
    description: 'Develop and execute marketing strategies for food delivery and restaurant discovery platform. Manage digital campaigns, analyze performance metrics, and drive user acquisition.',
    location: 'Delhi, Delhi',
    salary: '₹14,00,000 - ₹20,00,000 per year',
    experience: '4-7 years',
    skills: ['Digital Marketing', 'Google Analytics', 'SEO', 'Content Marketing', 'Social Media'],
    type: 'Full-time',
  },
  {
    title: 'Mobile App Developer',
    company: 'Google',
    description: 'Develop native Android applications using Kotlin and modern Android development practices. Work on Google Play services and contribute to open-source projects.',
    location: 'Bangalore, Karnataka',
    salary: '₹22,00,000 - ₹35,00,000 per year',
    experience: '3-6 years',
    skills: ['Kotlin', 'Android', 'Java', 'Firebase', 'Material Design'],
    type: 'Full-time',
  },
  {
    title: 'Business Analyst Intern',
    company: 'TCS',
    description: 'Analyze business requirements and create detailed documentation. Learn about enterprise software development lifecycle and work with senior analysts.',
    location: 'Chennai, Tamil Nadu',
    salary: '₹12,000 - ₹18,000 per month',
    experience: '0-1 year',
    skills: ['Excel', 'SQL', 'Data Analysis', 'Requirements Gathering'],
    type: 'Internship',
  },
  {
    title: 'Full Stack Developer',
    company: 'Microsoft',
    description: 'Build end-to-end web applications using .NET and React. Work on Microsoft Teams and Office 365 products, collaborating with international teams.',
    location: 'Hyderabad, Telangana',
    salary: '₹15,00,000 - ₹25,00,000 per year',
    experience: '2-4 years',
    skills: ['C#', '.NET', 'React', 'Azure', 'SQL Server'],
    type: 'Full-time',
  },
  {
    title: 'Content Writer',
    company: 'Flipkart',
    description: 'Create engaging content for e-commerce website and marketing campaigns. Write product descriptions, blog posts, and social media content.',
    location: 'Bangalore, Karnataka',
    salary: '₹8,00,000 - ₹12,00,000 per year',
    experience: '1-3 years',
    skills: ['Content Writing', 'SEO', 'Copywriting', 'Social Media'],
    type: 'Full-time',
  },
  {
    title: 'System Administrator',
    company: 'Infosys',
    description: 'Manage enterprise IT infrastructure and ensure system reliability. Handle server administration, network security, and IT operations.',
    location: 'Pune, Maharashtra',
    salary: '₹10,00,000 - ₹15,00,000 per year',
    experience: '2-4 years',
    skills: ['Linux', 'Windows Server', 'Networking', 'Security', 'VMware'],
    type: 'Full-time',
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

    const employers = {
      google: createdUsers.find((u) => u.email === 'sarah@google.com'),
      microsoft: createdUsers.find((u) => u.email === 'michael@microsoft.com'),
      infosys: createdUsers.find((u) => u.email === 'priya@infosys.com'),
      tcs: createdUsers.find((u) => u.email === 'rahul@tcs.com'),
      flipkart: createdUsers.find((u) => u.email === 'emma@flipkart.com'),
      swiggy: createdUsers.find((u) => u.email === 'david@swiggy.com'),
      zomato: createdUsers.find((u) => u.email === 'lisa@zomato.com'),
    };

    const applicant = createdUsers.find((u) => u.email === 'alex@jobportal.com');

    const createdJobs = [];
    const jobListings = [
      { ...jobs[0], postedBy: employers.google._id },
      { ...jobs[1], postedBy: employers.microsoft._id },
      { ...jobs[2], postedBy: employers.infosys._id },
      { ...jobs[3], postedBy: employers.tcs._id },
      { ...jobs[4], postedBy: employers.flipkart._id },
      { ...jobs[5], postedBy: employers.swiggy._id },
      { ...jobs[6], postedBy: employers.zomato._id },
      { ...jobs[7], postedBy: employers.google._id },
      { ...jobs[8], postedBy: employers.tcs._id },
      { ...jobs[9], postedBy: employers.microsoft._id },
      { ...jobs[10], postedBy: employers.flipkart._id },
      { ...jobs[11], postedBy: employers.infosys._id },
    ];

    for (const job of jobListings) {
      const createdJob = await Job.create(job);
      createdJobs.push(createdJob);
    }

    const applications = [
      { jobId: createdJobs[0]._id, applicantId: applicant._id, status: 'pending' },
      { jobId: createdJobs[1]._id, applicantId: applicant._id, status: 'reviewed' },
      { jobId: createdJobs[2]._id, applicantId: applicant._id, status: 'accepted' },
      { jobId: createdJobs[3]._id, applicantId: applicant._id, status: 'pending' },
      { jobId: createdJobs[4]._id, applicantId: applicant._id, status: 'rejected' },
    ];

    await Application.insertMany(applications);

    console.log('Database seeded successfully!');
    console.log(`Created ${createdUsers.length} users`);
    console.log(`Created ${createdJobs.length} jobs`);
    console.log(`Created ${applications.length} applications`);
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedData();
