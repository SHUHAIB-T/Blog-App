const MongoClient = require('mongodb').MongoClient;

const state = {
    db:null
}

const uri ='mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports.connect=async ()=>{
    try{
        await client.connect();
        state.db = await client.db(process.env.dbName);
        console.log("data base connected")
    }catch(err){
        console.log("error in connecting databse "+err);
    }

}
module.exports.get = () => {
    return state.db;
}