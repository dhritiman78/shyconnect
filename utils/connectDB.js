import mongoose from 'mongoose';

// MongoDB connection URI
const uri = `${process.env.NEXT_MONGO_URL}/shyconnect`;

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
       useNewUrlParser: true,
        useUnifiedTopology: true
       });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  }
};
