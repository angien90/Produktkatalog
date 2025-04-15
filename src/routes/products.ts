import express from 'express';

import {
    fetchAllProducts,
    fetchProduct,
    createProduct,
    deleteProduct,
    updateProduct } from '../controller/productController';

    const router = express.Router()

    router.get('/', fetchAllProducts)
    router.get('/:id', fetchProduct)
    router.post('/', createProduct)
    router.patch('/:id', updateProduct)
    router.delete('/:id', deleteProduct)

    export default router;