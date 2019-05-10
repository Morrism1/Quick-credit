import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const users = [
  {
    id: 1,
    email: 'admin@quickcredit.com',
    password: bcrypt.hashSync(process.env.ADMIN_PASS || 'learn', 8),
    isAdmin: true,
  },
];

export default users;
