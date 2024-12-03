import { Request, Response } from 'express';
import prisma from '../db/prisma';


export const createProduct = async (req: Request, res: Response) => {
    const { name, category, price, stock } = req.body;
    try {
        const product = await prisma.product.create({
            data: { name, category, price, stock },
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product', details: error });
    }
};


export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, category, price, stock } = req.body;
    try {
        const product = await prisma.product.update({
            where: { id: Number(id) },
            data: { name, category, price, stock },
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ error: 'Product not found', details: error });
    }
};


export const getProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({ where: { id: Number(id) } });
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product', details: error });
    }
};
