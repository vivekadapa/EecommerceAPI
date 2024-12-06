import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes'
import orderRoutes from './routes/orderRoutes'
import { Request, Response } from 'express';

const app = express();

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    const apiDetails = {
        message: "Welcome to the E-commerce API",
        description: "This route provides info of all the apis available",
        routes: {
            users: [
                {
                    route: "POST /api/users",
                    description: "Create a new user. Requires `name`, `email`,`phone`  in the request body."
                },
                {
                    route: "GET /api/users/:id",
                    description: "Fetch details of a specific user using the `userId` parameter."
                },
                {
                    route: "PUT /api/users/:id",
                    description: "Update a user's details using the `id` parameter."
                }
            ],
            products: [
                {
                    route: "POST /api/products",
                    description: "Create a new product. Requires `name`,`category`,`price`, and `stock` in the request body."
                },
                {
                    route: "GET /api/products/:id",
                    description: "Fetch details of a specific product using the `id` parameter."
                },
                {
                    route: "PUT /api/products/:id",
                    description: "Update the details of a product using the `id` parameter."
                }
            ],
            orders: [
                {
                    route: "POST /api/orders",
                    description: "Create a new order. Requires `userId`, `productId`, and `quantity` in the request body."
                },
                {
                    route: "GET /api/orders/:orderId",
                    description: "Fetch details of a specific order using the `orderId` parameter."
                },
                {
                    route: "PUT /api/orders/:orderId",
                    description: "Update the status of an order using the `orderId` parameter. Accepts `status` in the request body."
                },
                {
                    route: "GET /api/orders/recent",
                    description: "Fetch all orders created in the past 7 days."
                },
                {
                    route: "GET /api/orders/user/:userId",
                    description: "Fetch all orders placed by a specific user using the `userId` parameter."
                },
                {
                    route: "GET /api/orders/product/:productId/users",
                    description: "Fetch all users who have ordered a specific product using the `productId` parameter."
                },
                {
                    route: "GET /api/orders/stock/total",
                    description: "Fetch the total stock of all products available in the inventory."
                }
            ]
        }
    };

    res.send(apiDetails);
});


app.get('/readiness', (req, res) => {
    res.send("Server is ready")
})

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)


export default app;