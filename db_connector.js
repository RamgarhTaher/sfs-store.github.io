const mongoose = require("mongoose");

// const DB = `mongodb + srv://anyoneaccess:anyoneaccess@cluster0.hgrha.mongodb.net/sfsStoreDatabase?retryWrites=true&w=majority
// `;

const DB = const uri = process.env.MONGODB_URI;;

mongoose.connect(DB).then(() => {
    console.log('The server is sucsessfuly connected !');
}).catch((error) => console.log(error));

console.log('hello from the connect side !');


// ---> my mongodb connecting by localhost...
// mongodb://localhost:27017/sfscollection

// ---> my mongodb connecting by MongoDB Atlas...
// mongodb + srv://anyoneaccess:anyoneaccess@cluster0.hgrha.mongodb.net/sfsStoreDatabase?retryWrites=true&w=majority
