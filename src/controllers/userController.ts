import { Request, Response } from 'express';
import prisma from '../db/prisma'
import { z } from 'zod';

const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters").max(15, "Phone number is too long"),
});

export const createUser = async (req: Request, res: Response) => {
    try {
        const validatedData = userSchema.parse(req.body);
        const user = await prisma.user.create({ data: validatedData });
        res.status(201).json(user);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: "Validation error", details: error.errors });
            return;
        }
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            res.status(409).json({ error: "Email already exists" });
            return;
        }
        res.status(500).json({ error: 'Failed to create user', details: error });
    }
};


export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const userId = Number(id)
        if (isNaN(userId)) {
            res.status(400).json({ error: "Invalid user ID" });
            return;
        }
        const validatedData = userSchema.partial().parse(req.body);
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: validatedData,
        });
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: "Validation error", details: error.errors });
            return;
        }
        res.status(404).json({ error: 'User not found', details: error });
    }
};


export const getUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const userId = Number(id)
        if (isNaN(userId)) {
            res.status(400).json({ error: "Invalid user ID" });
            return;
        }
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user', details: error });
    }
};