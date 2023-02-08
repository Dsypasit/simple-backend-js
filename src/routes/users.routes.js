const express = require('express')
const router = express.Router();
const userController = require('../controllers/users.controller')

router.get('/', userController.get);

router.post('/', userController.create);

router.get('/:userId', userController.getById)

router.put('/:userId', userController.update)

router.delete('/:userId', userController.deleteUser)

module.exports = router
