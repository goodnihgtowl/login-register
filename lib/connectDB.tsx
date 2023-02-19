import mongoose from 'mongoose';

export default async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  const url = process.env.DATABASE_URL;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(url, options);
}