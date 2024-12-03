import express from 'express';
import { createProduct, updateProduct, getProduct } from '../controllers/productController';

const router = express.Router();

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.get('/:id', getProduct);

export default router;
