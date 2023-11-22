import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { Order, OrderModel } from '../models/orderModel'
import { Product } from '../models/productModel'
import { isAuth } from '../utils'
export const orderRouter = express.Router()


// get all orders with user id
orderRouter.get(
  '/mine',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderModel.find({ user: req.user._id }) // link to mongodb
    res.json(orders) // send result back to frontend
  })
)

// get the order based on specific id
// /api/orders/:id
orderRouter.get(
  '/:id',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id)
    if (order) {
      res.json(order)
    } else {
      res.status(404).json({ message: "Order Not Found" })
    }
  })
)

// 
orderRouter.post(
  '/',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).json({ message: "Cart is empty" })
    } else {
      const createdOrder = await OrderModel.create({
        // transforms an array of product objects by adding a new property named product to each object. 
        // The value of this new property is set to the _id property of the original product object.
        orderItems: req.body.orderItems.map((product: Product) => ({
          ...product,
          product: product._id, 
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id, // from util.ts: isAuth()
      } as Order)
      res.status(201).json({ message: "Order Created", order: createdOrder })
    }
  })
)

orderRouter.put( // put : update data  hook: usePayOrderMutation
  '/:id/pay',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id) // find order by order id from frontend

    if (order) { // if order exists in the database then update the isPaid for this order to true
      order.isPaid = true
      order.paidAt = new Date(Date.now())
      order.paymentResult = {
        paymentId: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      }
      const updatedOrder = await order.save() // save changes to mongodb and get the updated order

      res.send({ order: updatedOrder, message: 'Order Paid Successfully' }) // send back to front end
    } else {
      res.status(404).json({ message: 'Order Not Found' }) // order does not exist
    }
  })
)