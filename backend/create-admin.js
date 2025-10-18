import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  role: String,
  createdAt: Date,
  updatedAt: Date
});

const User = mongoose.model('User', userSchema);

async function createAdminUser() {
  try {
    console.log('🔐 GDG ITER - Create Admin User\n');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get user input
    const name = await question('Enter admin name: ');
    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password: ');

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('\n⚠️  User with this email already exists!');
      const update = await question('Do you want to make this user an admin? (yes/no): ');
      
      if (update.toLowerCase() === 'yes' || update.toLowerCase() === 'y') {
        existingUser.role = 'admin';
        existingUser.updatedAt = new Date();
        await existingUser.save();
        console.log('\n✅ User updated to admin successfully!');
      }
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // Create admin user
      const admin = new User({
        name,
        email,
        passwordHash,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await admin.save();
      console.log('\n✅ Admin user created successfully!');
    }

    console.log('\n📧 Email:', email);
    console.log('👤 Role: admin');
    console.log('\n🚀 You can now login at http://localhost:5173/admin-login');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    rl.close();
    await mongoose.connection.close();
    process.exit(0);
  }
}

createAdminUser();
