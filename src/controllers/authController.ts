import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient';

export const register = async (req: Request, res: Response) => {
const { name, username, email, password } = req.body;

const hashed = await bcrypt.hash(password, 10);

const user = await prisma.user.create({
data: {
name,
username,
email,
password: hashed,
},
});

res.json(user);
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });
    
    const token = jwt.sign({ userId: user.userId }, 'SECRETKEY');
    
    res.json({ token });
    };