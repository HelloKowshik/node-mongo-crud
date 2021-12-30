const router = require('express').Router();
const handleLogout = require('../controller/logoutController');

router.get('/', handleLogout);

module.exports = router;

// const { MongoClient } = require('mongodb');
// const uri =
//   'mongodb+srv://<username>:<password>@cluster0.e0fhg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect((err) => {
//   const collection = client.db('test').collection('devices');
//   // perform actions on the collection object
//   client.close();
// });
