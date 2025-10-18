import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate a secure JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');

// Create .env content
const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
# Replace with your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/gdg-iter
# For MongoDB Atlas, use:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/gdg-iter?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=${jwtSecret}

# Client URL (Frontend)
CLIENT_URL=http://localhost:5173

# Admin Default Credentials (Optional - for first admin user)
ADMIN_EMAIL=admin@gdgiter.com
ADMIN_PASSWORD=Admin@123
`;

// Write to .env file
const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('If you want to regenerate it, delete the existing .env file first.');
  console.log('\nGenerated JWT Secret (copy this if needed):');
  console.log(jwtSecret);
} else {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Review and update the MongoDB URI in server/.env');
  console.log('2. Change the JWT_SECRET if deploying to production');
  console.log('3. Start MongoDB service');
  console.log('4. Run: npm run dev (from server directory)');
}
