import { Request, Response } from 'express';
import prisma from '../db/prisma';
import { z } from 'zod';


const orderSchema = z.object({
    userId: z.number().int().positive("User ID must be a valid positive number"),
    productId: z.number().int().positive("Product ID must be a valid positive number"),
    quantity: z.number().int().positive("Quantity must be a valid positive number"),
});


// Clean the code later by adding a middleware to check if the the product has stock left
export const createOrder = async (req: Request, res: Response) => {
    try {

        const validatedData = orderSchema.parse(req.body);
        const { userId, productId, quantity } = validatedData;
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        if (product.stock < quantity) {
            res.status(400).json({ error: 'Insufficient stock' });
            return;
        }

        const order = await prisma.order.create({
            data: { userId, productId, quantity },
        });

        await prisma.product.update({
            where: { id: productId },
            data: { stock: { decrement: quantity } },
        });

        res.status(201).json(order);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: "Validation error", details: error.errors });
            return;
        }
        res.status(500).json({ error: 'Failed to create order', details: error });
    }
};

export const getRecentOrders = async (req: Request, res: Response) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
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
        const userIdNumber = Number(userId);
        if (isNaN(userIdNumber)) {
            res.status(400).json({ error: "Invalid user ID" });
            return;
        }

        const orders = await prisma.order.findMany({ where: { userId: userIdNumber } });
        if (!orders.length) {
            res.status(404).json({ error: 'No orders found for this user' });
            return;
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders', details: error });
    }
};


export const getUsersByProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;
    try {
        const productIdNumber = Number(productId);
        if (isNaN(productIdNumber)) {
            res.status(400).json({ error: "Invalid product ID" });
            return;
        }
        const users = await prisma.user.findMany({
            where: { orders: { some: { productId: productIdNumber } } },
        });
        if (!users.length) {
            res.status(404).json({ error: 'No users found for this product' });
            return;
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users', details: error });
    }
};


export const getTotalStock = async (req: Request, res: Response) => {
    try {
        const totalStock = await prisma.product.aggregate({ _sum: { stock: true } });
        if (totalStock._sum.stock === null) {
            res.status(404).json({ error: 'No products found' });
            return;
        }
        res.status(200).json({ totalStock: totalStock._sum.stock });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch total stock', details: error });
    }
};
