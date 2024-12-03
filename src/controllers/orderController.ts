import { Request, Response } from 'express';
import prisma from '../db/prisma';



// Clean the code later by adding a middleware to check if the the product has stock left
export const createOrder = async (req: Request, res: Response) => {
    const { userId, productId, quantity } = req.body;
    try {
        const product = await prisma.product.findUnique({ where: { id: Number(productId) } });
        if (!product || product.stock < quantity) {
            res.status(400).json({ error: 'Insufficient stock or product not found' });
            return;
        }

        const order = await prisma.order.create({
            data: { userId: Number(userId), productId: Number(productId), quantity: Number(quantity) },
        });

        await prisma.product.update({
            where: { id: Number(productId) },
            data: { stock: { decrement: Number(quantity) } },
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order', details: error });
    }
};


export const getRecentOrders = async (req: Request, res: Response) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    try {
        const orders = await prisma.order.findMany({
            where: { orderDate: { gte: sevenDaysAgo } },
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders', details: error });
    }
};


export const getUserOrders = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const orders = await prisma.order.findMany({ where: { userId: Number(userId) } });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders', details: error });
    }
};


export const getUsersByProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;
    try {
        const users = await prisma.user.findMany({
            where: { orders: { some: { productId: Number(productId) } } },
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users', details: error });
    }
};


export const getTotalStock = async (req: Request, res: Response) => {
    try {
        const totalStock = await prisma.product.aggregate({ _sum: { stock: true } });
        res.status(200).json({ totalStock: totalStock._sum.stock });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch total stock', details: error });
    }
};
