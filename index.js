const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000


// DBU: userManagement
// DBP: 0z0Ihd13OVhFyyza


app.use(express.json())
app.use(cors())




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://userManagement:0z0Ihd13OVhFyyza@cluster0.zoyeiku.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const productCollection = client.db('OnlineStoreDB').collection('products')
        const CartCollection = client.db('OnlineStoreDB').collection('productCart')
        
        // Product Manage
        app.get('/products', async(req, res) =>{
            const result = await productCollection.find().toArray()
            res.send(result)
        })

        app.get('/product/:id', async(req, res) =>{
            const Id = req.params.id
            const query = {_id: new ObjectId(Id)}
            const result = await productCollection.findOne(query)
            res.send(result)
        })


        // Card Ites manage

        app.post('/add-cart', async(req, res) =>{
            const CardData = req.body
            const result = await CartCollection.insertOne(CardData)
            res.send(result)
        })

        app.get('/cart-items/:email', async(req, res) =>{
            const email = req.params.email
            const query = {user: email}
            const result = await CartCollection.find(query).toArray()
            res.send(result)
        })

        app.delete('/cart-product-delete/:id', async(req, res) =>{
            const Id = req.params.id
            console.log(Id)
            const query = {_id: new ObjectId(Id)}
            const result = await CartCollection.deleteOne(query)
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send("Online Store shop running.....")
})

app.listen(port, () => {
    console.log(`My server running on ${port}`)
})