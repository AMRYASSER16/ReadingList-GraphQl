const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

mongoose.connect('mongodb+srv://AYasserK:z1mzOMPSjB2Ws1vq@cluster0.i1h7z.mongodb.net/Cluster0?retryWrites=true&w=majority');

mongoose.connection.once('open', () => {
    console.log('connected to DB')
})

app.listen(4000, () => console.log('Listening'));
