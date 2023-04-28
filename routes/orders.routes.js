const express = require('express')

const ordersControllers = require('../controllers/orders.controller');
const authMiddleware = require('../middlewares/auth.Middleware ');

const router = express.Router();
router.use(authMiddleware.protect)

router.post('/', ordersControllers.createOrder);


router
.get('/me', ordersControllers.findOneOrder)

router.route('/:id')
.patch(ordersControllers.updateOrder)
.delete(ordersControllers.deleteOrder)



  module.exports = router;