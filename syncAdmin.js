require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function syncAdmin() {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/saas_monetization_db';
    await mongoose.connect(MONGO_URI);
    
    const email = 'superadmin@admin.com';
    const rawPassword = 'SuperAdminPassword123';
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    await User.deleteOne({ email });

    const superAdmin = new User({
      name: 'Super Admin',
      email: email,
      password: hashedPassword,
      role: 'superadmin',
      isActive: true,
      status: 'active'
    });

    await superAdmin.save();
    console.log('✅ Super Admin Reset Done!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

syncAdmin();