require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const userSchemaPromise = require('./models/UserSchema');
const userResolver = require('./services/userResolver');
const userRouter = require('./routes/UserRouter'); // Import UserRouter
const mdb = require('../../db.config');

const app = express();

async function setupServer() {
  try {
    const userSchema = await userSchemaPromise;

    app.use(express.json()); 
    app.use('/v1/user', userRouter); 


    app.use(
      '/graphql',
      graphqlHTTP({
        schema: userSchema,
        rootValue: userResolver,
        graphiql: true,
      })
    );

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}

setupServer();
