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
        
        app.get('/products', async(req, res) =>{
            const result = await productCollection.find().toArray()
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