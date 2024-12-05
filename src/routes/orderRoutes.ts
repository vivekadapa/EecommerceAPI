import express from 'express';
import {
    createOrder,
    getOrderById,
    updateOrder,
    getRecentOrders,
    getUserOrders,
    getUsersByProduct,
    getTotalStock,
} from '../controllers/orderController';

const router = express.Router();

router.post('/', createOrder);
router.get('/:orderId', getOrderById);
router.put('/:orderId', updateOrder);
router.get('/recent', getRecentOrders);
router.get('/user/:userId', getUserOrders);
router.get('/product/:productId/users', getUsersByProduct);
router.get('/stock/total', getTotalStock);

export default router;
