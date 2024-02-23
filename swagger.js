const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'E-Commerce API',
            description: 'API documentation for E-Commerce application',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:8000/', // Specify the base URL of your server
                description: 'Local server',
            },
        ],
    },
    apis: ['./routes/index.js'], // Specify the path to your route files
   
};

module.exports = swaggerOptions;
