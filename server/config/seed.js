import User from '../models/User.js';

const seedUser = async () => {
  try {
    const userExists = await User.findOne({ username: 'a@a' });
    if (!userExists) {
      console.log('🌱 Seeding demo user: a@a / a');
      await User.create({
        name: 'Demo Admin',
        username: 'a@a',
        password: 'a',
        role: 'farmer'
      });
      console.log('✅ Demo user seeded.');
    } else {
      console.log('ℹ️  Demo user already exists, skipping seed.');
    }
  } catch (error) {
    console.error('❌ Error seeding user:', error.message);
  }
};

export default seedUser;
