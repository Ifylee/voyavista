const typeDefs = `

type Category {
    id:ID
    name:String

}
    type Trip {

    id:ID
    title:String
    summary:String
    description:String
    additionalImages:[String]
    groupSize:String
    img:String
    price: Float
    category: Category

}


type User {
    _id:ID
    firstName:String
    lastName:String
    email: String
    purchased:[Trip]
    wishList:[Trip]
}



type Auth {
    token:ID
    user:User

}


type Checkout {
    session: ID
}

type Query {

    allUsers:[User]
    currentUser:User
    categories:[Category]
    allTrips:[Trip]
    oneTrip(_id:ID!):Trip
    checkout(products: [ID]!): Checkout

}

type Mutation {

    addUser(firstName:String!, lastName:String!, email:String!, password:String!):Auth

    login(email:String!, password:String!):Auth

    boughtTrip(_id:ID!):User

    addToList(_id:ID!):User

    deleteFromList(_id:ID!):User


}


`;

module.exports = typeDefs;
