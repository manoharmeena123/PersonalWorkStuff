const { userRoutes } = require("./userRoutes");
const { productRoutes } = require("./productRoutes");
const { userProfileRoutes } = require("./userProfileRoutes");

module.exports = {
  userRoutes,
  productRoutes,
  userProfileRoutes,
};

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /auth/sign:
 *   post:
 *     summary: User sign-in
 *     tags: [Authentication]
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: The user credentials for sign-in
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             scope:
 *               type: string
 *           example:
 *             email: example@example.com
 *             password: mypassword
 *             scope: admin
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /auth/admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Authentication]
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: The admin credentials for login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *           example:
 *             email: admin@example.com
 *             password: adminpassword
 *     responses:
 *       200:
 *         description: Admin login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 scope:
 *                   type: string
 *       404:
 *         description: Admin not found
 *       401:
 *         description: Invalid password
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /auth/customer/login:
 *   post:
 *     summary: Customer login
 *     tags: [Authentication]
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: The customer credentials for login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *           example:
 *             email: customer@example.com
 *             password: customerpassword
 *     responses:
 *       200:
 *         description: Customer login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 scope:
 *                   type: string
 *       404:
 *         description: Customer not found
 *       401:
 *         description: Invalid password
 *       500:
 *         description: Internal Server Error
 */
//================================================================================================================================>
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: JWT token obtained after successful authentication
 *         schema:
 *           type: string
 *       - in: body
 *         name: Product
 *         description: The product details to add
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The name of the product
 *             description:
 *               type: string
 *               description: The description of the product
 *             price:
 *               type: number
 *               minimum: 0
 *               description: The price of the product
 *             category:
 *               type: string
 *               description: The category of the product
 *         example:
 *           name: Product Name
 *           description: Product Description
 *           price: 10
 *           category: Product Category
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#'
 *       400:
 *         description: Bad request - Missing or invalid parameters
 *       401:
 *         description: Unauthorized - Invalid token
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /products/all:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: JWT token obtained after successful authentication
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: JWT token obtained after successful authentication
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /products/{productId}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: JWT token obtained after successful authentication
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: ''
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: JWT token obtained after successful authentication
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
