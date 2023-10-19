


const express = require('express')
require('dotenv').config()

const app = express()

const cors = require('cors')
const port = process.env.PORT ||5000;

app.use(cors());
app.use(express.json())





console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

const { MongoClient, ServerApiVersion, ObjectId  } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xm8ksdz.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();

    const bransCollection = client.db('bransdDB').collection("brand");
    const productCollection = client.db('productDB').collection("product");

    
    app.get("/brand/:brandName" , async(req , res)=>{
      const   brandName  = req.params.brandName;
      const queary = {brandName:brandName}
      
      const items = await bransCollection.find(queary).toArray();
     
      res.send(items)
    })
    // Specific One Brand Get Dtata
    app.get("/brands/:id" , async(req , res)=>{
      const   id  = req.params.id;
      console.log(id);
      const queary = {_id : new ObjectId(id)}
      console.log(queary);
      const result = await bransCollection.findOne(queary );
      // console.log(result);
      res.send(result)
    })

    app.get("/brand" , async(req , res)=>{
      const cursur = bransCollection.find();
      const result = await cursur.toArray();
      res.send(result)
    })



    app.get("/products/:userData" , async(req , res)=>{
      const   userData  = req.params.userData;
      const queary = {userData:userData}
      // const cursur = productCollection.find();
      const result = await productCollection.find(queary).toArray();
      res.send(result)
    })






    app.post("/brand", async(req , res)=> {
      const brand = req.body;
      const result = await bransCollection.insertOne(brand)  
    // console.log(brand); 
      res.send(result)
  })


    app.post("/product", async(req , res)=> {
      const product = req.body;
      const result = await productCollection.insertOne(product)  
    // console.log(brand); 
      res.send(result)
  })







    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}






run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Hello World!ddd')

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})