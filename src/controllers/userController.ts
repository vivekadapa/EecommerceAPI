import { Request, Response } from 'express';
import prisma from '../db/prisma'


export const createUser = async (req: Request, res: Response) => {
    const { name, email, phone } = req.body;
    try {
        const user = await prisma.user.create({ data: { name, email, phone } });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user', details: error });
    }
};


export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email, phone },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: 'User not found', details: error });
    }
};


export const getUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user', details: error });
    }
};