const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://sahajjain1903_db_user:sahaj19@agripay.6hudsya.mongodb.net/agripay?retryWrites=true&w=majority&appName=AgriPay";

async function check() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected');
  
  const Loan = mongoose.connection.collection('loans');
  const loans = await Loan.find({}).toArray();
  console.log('Total loans in DB:', loans.length);
  console.log(loans);
  
  const User = mongoose.connection.collection('users');
  const users = await User.find({}).toArray();
  console.log('Total users in DB:', users.length);
  
  process.exit(0);
}

check().catch(console.error);
