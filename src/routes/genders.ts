import express from 'express';

import {
    fetchAllGenders,
    fetchGender,
    fetchProductsByGender,
    createGender,
    deleteGender,
    updateGender } from '../controller/genderController';

    const router = express.Router()

    router.get('/', fetchAllGenders)
    router.get('/:id', fetchGender)
    router.get('/:id/products', fetchProductsByGender)
    router.post('/', createGender)
    router.patch('/:id', updateGender)
    router.delete('/:id', deleteGender);

    export default router;