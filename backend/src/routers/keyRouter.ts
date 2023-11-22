import express from 'express'
const keyRouter = express.Router();

// with index.ts : app.use('api/keys', keyRouter);
// frontEnd can get Client id from the Endpoint URL, which is https://:local4000/api/keys/paypal
keyRouter.get('/paypal', (req,res) => {
    res.send({clientId : process.env.PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID_SANDBOX}) // send to frontend
})
 
export default keyRouter;