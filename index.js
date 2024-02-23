require("dotenv").config()
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const {userRoutes,productRoutes} = require('./routes/index')
const {connection} = require('./confige/confige')
const authenticate = require("./middleware/authenticate")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger');
const specs = swaggerJsdoc(swaggerOptions);
//==========================Routes============================================>
// Serve Swagger UI at /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', userRoutes);
app.use(authenticate)
app.use('/product', productRoutes);

app.get('/',(req,res)=>{
res.status(200).json("Welcome on E-Commerce App")
})
// Global error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});


// ======================Start the server======================================>
app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log('Database connected successfully');
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`);
        process.exit(1);
    }
    console.log(`Server is running on ${process.env.PORT}`);
});
