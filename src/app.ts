import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes'
import orderRoutes from './routes/orderRoutes'

const app = express();

app.use(bodyParser.json());

app.get('/readiness', (req, res) => {
    res.send("Server is ready")
})

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)


export default app;