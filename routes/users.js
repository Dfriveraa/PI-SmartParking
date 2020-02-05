const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController.js');

router.get('/',userController.getAllUsers);

router.get('/:id',userController.getUserById);

router.patch('/:id',userController.updateUser);

router.delete(':id',userController.deleteUser);

router.post('/',userController.createUser);

module.exports  = router;