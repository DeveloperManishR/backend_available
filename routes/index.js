import expres from "express"
import userRoute from "../controllers/User/user.route.js"

const app=expres();

app.use("/auth",userRoute)
// app.use("/product",productRoute)
// app.use("/wishlist",wishlistRoute)
// app.use('/cart',cartRoute)
// app.use('/order',orderRoute)
// app.use('/review',reviewRoute)
// app.use('/notification',notificationRoute)
// app.use('/address',addressRoute)




export default app