import express from "express";

const {
    getAllUsers,
    getUserById, 
    updateUser, 
    createUser, 
    deleteUser,
    getUserByTipo  
} = require('../controllers/userController/user');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

router.route('/:tipo').get(getUserByTipo);

module.exports = router;