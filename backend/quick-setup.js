#!/usr/bin/env node

/**
 * Quick Setup Script for Real-Time Admin Panel
 * Run with: node backend/quick-setup.js
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

// Import models
import User from './models/User.js';
import Event from './models/Event.js';
import TeamMember from './models/TeamMember.js';
import Poll from './models/Poll.js';
import PlanOfAction from './models/PlanOfAction.js';
import Notice from './models/Notice.js';

const setupDatabase = async () => {
  try {
    console.log('🚀 Starting database setup...\n');

    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gdgweb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...');
    await Event.deleteMany({});
    await TeamMember.deleteMany({});
    await Poll.deleteMany({});
    await PlanOfAction.deleteMany({});
    await Notice.deleteMany({});
    console.log('✅ Cleared existing data\n');

    // Create admin user if doesn't exist
    console.log('👤 Setting up admin user...');
    let adminUser = await User.findOne({ email: 'admin@gdg.com' });
    
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@gdg.com',
        passwordHash: hashedPassword,
        role: 'admin',
        isEmailVerified: true,
      });
      console.log('✅ Admin user created');
      console.log('   Email: admin@gdg.com');
      console.log('   Password: admin123\n');
    } else {
      console.log('✅ Admin user already exists\n');
    }

    // Create sample events
    console.log('📅 Creating sample events...');
    const events = await Event.insertMany([
      {
        title: 'Google I/O Extended 2025',
        description: 'Experience the latest Google innovations at our extended event',
        date: new Date('2025-11-15'),
        location: 'ITER Campus, Bhubaneswar',
        imageUrl: 'https://picsum.photos/800/600?random=1',
        category: 'signature',
        status: 'upcoming',
        createdBy: adminUser._id,
      },
      {
        title: 'Android Study Jams',
        description: 'Learn Android development with hands-on coding sessions',
        date: new Date('2025-10-25'),
        location: 'Computer Lab, ITER',
        imageUrl: 'https://picsum.photos/800/600?random=2',
        category: 'workshop',
        status: 'ongoing',
        createdBy: adminUser._id,
      },
      {
        title: 'DevFest Bhubaneswar 2024',
        description: 'Community-run developer event with talks, demos, and networking',
        date: new Date('2024-12-01'),
        location: 'KIIT Campus',
        imageUrl: 'https://picsum.photos/800/600?random=3',
        category: 'past',
        status: 'completed',
        createdBy: adminUser._id,
      },
    ]);
    console.log(`✅ Created ${events.length} sample events\n`);

    // Create sample team members
    console.log('👥 Creating sample team members...');
    const teamMembers = await TeamMember.insertMany([
      {
        name: 'Alice Johnson',
        role: 'Lead Organizer',
        department: 'Lead',
        imageUrl: 'https://i.pravatar.cc/300?img=1',
        bio: 'Passionate about building developer communities',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/alice',
          github: 'https://github.com/alice',
          email: 'alice@gdg.com',
        },
        order: 1,
        isActive: true,
        createdBy: adminUser._id,
      },
      {
        name: 'Bob Smith',
        role: 'Tech Lead',
        department: 'Tech',
        imageUrl: 'https://i.pravatar.cc/300?img=2',
        bio: 'Full-stack developer and open source enthusiast',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/bob',
          github: 'https://github.com/bob',
          email: 'bob@gdg.com',
        },
        order: 2,
        isActive: true,
        createdBy: adminUser._id,
      },
      {
        name: 'Carol Martinez',
        role: 'Design Lead',
        department: 'Design',
        imageUrl: 'https://i.pravatar.cc/300?img=3',
        bio: 'UI/UX designer creating beautiful experiences',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/carol',
          email: 'carol@gdg.com',
        },
        order: 3,
        isActive: true,
        createdBy: adminUser._id,
      },
    ]);
    console.log(`✅ Created ${teamMembers.length} sample team members\n`);

    // Create sample poll
    console.log('📊 Creating sample poll...');
    const poll = await Poll.create({
      question: 'Which technology topic interests you the most?',
      options: [
        { text: 'Cloud Computing & DevOps', votes: 15 },
        { text: 'Machine Learning & AI', votes: 23 },
        { text: 'Web Development', votes: 18 },
        { text: 'Mobile App Development', votes: 12 },
      ],
      isActive: true,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      totalVotes: 68,
      createdBy: adminUser._id,
    });
    console.log('✅ Created sample poll\n');

    // Create sample plan of action items
    console.log('📋 Creating sample plan of action items...');
    const planItems = await PlanOfAction.insertMany([
      {
        title: 'Organize Monthly Tech Talks',
        description: 'Schedule and conduct monthly technical sessions',
        category: 'technical',
        priority: 'high',
        status: 'in-progress',
        targetDate: new Date('2025-11-30'),
        order: 1,
        createdBy: adminUser._id,
      },
      {
        title: 'Expand Community Outreach',
        description: 'Reach out to other colleges and organizations',
        category: 'outreach',
        priority: 'medium',
        status: 'planned',
        targetDate: new Date('2025-12-15'),
        order: 2,
        createdBy: adminUser._id,
      },
    ]);
    console.log(`✅ Created ${planItems.length} plan of action items\n`);

    // Create sample notices
    console.log('📢 Creating sample notices...');
    const notices = await Notice.insertMany([
      {
        title: 'Welcome to GDG ITER!',
        content: 'Join us for exciting developer events and workshops throughout the year.',
        type: 'info',
        isActive: true,
        priority: 1,
        targetAudience: 'all',
        createdBy: adminUser._id,
      },
      {
        title: 'Registration Open for DevFest',
        content: 'Early bird registration is now open. Limited seats available!',
        type: 'urgent',
        isActive: true,
        priority: 5,
        expiryDate: new Date('2025-11-01'),
        targetAudience: 'public',
        createdBy: adminUser._id,
      },
    ]);
    console.log(`✅ Created ${notices.length} sample notices\n`);

    // Display summary
    console.log('═══════════════════════════════════════════');
    console.log('🎉 Database setup completed successfully!');
    console.log('═══════════════════════════════════════════\n');
    console.log('📊 Summary:');
    console.log(`   • Events: ${events.length}`);
    console.log(`   • Team Members: ${teamMembers.length}`);
    console.log(`   • Polls: 1`);
    console.log(`   • Plan Items: ${planItems.length}`);
    console.log(`   • Notices: ${notices.length}\n`);
    console.log('🔐 Admin Credentials:');
    console.log('   • Email: admin@gdg.com');
    console.log('   • Password: admin123\n');
    console.log('🚀 Next Steps:');
    console.log('   1. Start the server: npm run dev (in backend/)');
    console.log('   2. Start the frontend: npm run dev (in frontend/)');
    console.log('   3. Login at: http://localhost:5173/admin/login');
    console.log('   4. Test real-time updates by opening multiple browser tabs\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error during setup:', error);
    process.exit(1);
  }
};

// Run setup
setupDatabase();
