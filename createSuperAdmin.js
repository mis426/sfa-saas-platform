const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const createSuperAdmin = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sfa_db';
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);

    // Superadmin User Delete existing to ensure clean state
    await User.deleteMany({ role: 'superadmin' });
    await User.deleteMany({ email: 'superadmin@admin.com' });

    // Hash Password
    const hashedPassword = await bcrypt.hash('adminpassword123', 10);

    // Create New SuperAdmin Document
    const superAdmin = new User({
      name: 'Super Admin',
      email: 'superadmin@admin.com',
      password: hashedPassword,
      role: 'superadmin'
    });

    await superAdmin.save();

    console.log('-------------------------------------------');
    console.log('✅ SuperAdmin Account Created Successfully!');
    console.log('📧 Email    : superadmin@admin.com');
    console.log('🔑 Password : adminpassword123');
    console.log('-------------------------------------------');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating SuperAdmin:', err);
    process.exit(1);
  }
};

createSuperAdmin();