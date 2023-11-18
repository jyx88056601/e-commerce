
import bcrypt from 'bcrypt';
import {User} from "./models/userModel"

const sampleUsers: User[] = [
    {
        name: 'Joe',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Alice',
        email: 'alice@example.com',
        password: bcrypt.hashSync('password123', 10),
        isAdmin: false,
    },
    {
        name: 'Bob',
        email: 'bob@example.com',
        password: bcrypt.hashSync('pass123', 10),
        isAdmin: false,
    },
];
 
export default sampleUsers;