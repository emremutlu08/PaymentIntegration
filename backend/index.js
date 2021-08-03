const express = require("express")
const cors = require("cors")

const stripe = require("stripe")("sk_test_F0KeHi8r4JdTNeNmE2YNHGqR00mVoYSq5f")

const app = express()

app.use(cors())
app.use(express.json())


// middlewares

app.get("/", (req, res)=>{
    res.send("<h1>Welcome to the Backend</h1>")
})

app.get("/test", (req, res)=>{
    res.send("<h1>You are on the test route</h1>")
})


app.post("/pay", (req, res)=>{
    const {token, product} = req.body;

    console.log(token)
    console.log(product)

    try {
        
        stripe.charges.create({
            amount: product.amount,
            currency: "usd",
            source: token.tokenId,
            description: `purchased ${product.productName}`
        })

        res.send("Success")

    } catch (error) {
        res.send("Error")
    }
})


app.listen(8282, ()=>{
    console.log("I am running (Backend)")
})