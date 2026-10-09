const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Path adjust karein agar zaroorat ho[cite: 12]
require('dotenv').config(); //[cite: 12]

const seedSuperAdmin = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sfa_db'; //[cite: 12]
    await mongoose.connect(MONGO_URI); //[cite: 12]
    console.log('📦 MongoDB Connected for Seeding...'); //[cite: 12]

    const targetEmail = 'superadmin@admin.com'; //[cite: 12]

    // 1. Clean up existing admin if present[cite: 12]
    await User.deleteOne({ email: targetEmail }); //[cite: 12]

    // 2. Hash Password[cite: 12]
    const rawPassword = 'adminpassword123'; //[cite: 12]
    const salt = await bcrypt.genSalt(10); //[cite: 12]
    const hashedPassword = await bcrypt.hash(rawPassword, salt); //[cite: 12]

    // 3. Create SuperAdmin Document[cite: 12]
    const superAdminData = {
      name: 'Super Admin', //[cite: 12]
      email: targetEmail, //[cite: 12]
      password: hashedPassword, //[cite: 12]
      role: 'superadmin', //[cite: 12]
      // Optional: Agar aapka schema clientId require karta hai
      clientId: new mongoose.Types.ObjectId() //[cite: 10]
    };

    const superAdmin = new User(superAdminData); //[cite: 12]
    await superAdmin.save(); //[cite: 12]

    console.log('✅ SuperAdmin User created successfully!'); //[cite: 12]
    console.log(`📧 Email: ${targetEmail}`); //[cite: 12]
    console.log(`🔑 Password: ${rawPassword}`); //[cite: 12]

    await mongoose.disconnect();
    process.exit(0); //[cite: 12]
  } catch (err) {
    console.error('❌ Seeding Error:', err); //[cite: 12]
    await mongoose.disconnect();
    process.exit(1); //[cite: 12]
  }
};

seedSuperAdmin(); //[cite: 12]