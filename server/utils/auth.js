require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const expiration = "1h";
const { GraphQLError } = require("graphql");

module.exports = {
  AuthenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),

  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    // This will split the string so that it only contains the token's string
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    if (!token) {
      return req;
    }
    try {
      // This method will verify the token and extract the data
      // that is within it
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // If the token is successfully verified we save the data
      // in the property of user to be used in the context
      req.user = data;
    } catch (error) {
      console.log("Invalid Token");
    }
    return req;
  },

  signToken: function ({ firstName, email, _id }) {
    // This takes the user's info so that it can be used to create a token
    const payload = { firstName, email, _id };
    // This method creates the token to be sent to the front-end
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};