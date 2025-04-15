import express from 'express';

import { 
    fetchAllCategories, 
    fetchCategory, 
    createCategory, 
    deleteCategory, 
    updateCategory } from '../controller/categoryController';

    const router = express.Router()

    router.get('/', fetchAllCategories)
    router.get('/:id', fetchCategory)
    router.post('/', createCategory)
    router.patch('/:id', updateCategory)
    router.delete('/:id', deleteCategory)

    export default router;