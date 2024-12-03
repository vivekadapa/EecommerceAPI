import express from 'express';
import {
    createOrder,
    getRecentOrders,
    getUserOrders,
    getUsersByProduct,
    getTotalStock,
} from '../controllers/orderController';

const router = express.Router();

router.post('/', createOrder);
router.get('/recent', getRecentOrders);
router.get('/user/:userId', getUserOrders);
router.get('/product/:productId/users', getUsersByProduct);
router.get('/stock/total', getTotalStock);

export default router;
