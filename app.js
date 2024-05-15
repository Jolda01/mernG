require('dotenv').config()
const express=require('express')
const {ApolloServer}=require('apollo-server-express')
const typeDefs=require('./src/microservices/user-service/models/user-schema.gql')
const resolvers=require('./src/microservices/user-service/services/userService')
const mdb = require('./src/db.config')
const app=express()

const server=new ApolloServer({
    typeDefs,
    resolvers
})

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log(`Api is ready on ${PORT}`)
}) 