import { Request, Response } from 'express';
import prisma from '../db/prisma';
import { z } from 'zod';

const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    category: z.string().min(1, "Category is required"),
    price: z.number().positive("Price must be a positive number"),
    stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
});

export const createProduct = async (req: Request, res: Response) => {
    try {
        const validatedData = productSchema.parse(req.body);
        const product = await prisma.product.create({
            data: validatedData
        });
        res.status(201).json(product);
    } catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: "Validation error", details: error.errors });
            return;
        }
        res.status(500).json({ error: 'Failed to create product', details: error });
    }
};


export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const validatedData = productSchema.partial().parse(req.body);
        const product = await prisma.product.update({
            where: { id: Number(id) },
            data: validatedData,
        });
        res.status(200).json(product);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: "Validation error", details: error.errors });
            return;
        }
        res.status(404).json({ error: 'Product not found', details: error });
    }
};


export const getProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const productId = Number(id);
        if (isNaN(productId)) {
            res.status(400).json({ error: "Invalid product ID" });
            return;
        }
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product', details: error });
    }
};
