// client/src/utils/mutations.js
import { gql } from "@apollo/client";

// Mutation will be used to log user in
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        email
      }
    }
  }
`;
// Mutation will be used to create a new account
export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        firstName
        email
      }
    }
  }
`;

// This mutation will add a trip to wishlist taking the trip's id
export const ADD_WISH_LIST = gql`
  mutation AddToList($id: ID!) {
    addToList(_id: $id) {
      _id
      wishList {
        title
        id
        category {
          name
        }
      }
    }
  }
`;

// This mutation will add a trip to the purchased trips in the users account using the trips id
export const BOUGHT_TRIP = gql`
  mutation BoughtTrip($id: ID!) {
    boughtTrip(_id: $id) {
      _id
      email
      purchased {
        category {
          name
        }
        id
        title
      }
    }
  }
`;

// This mutation will delete a trip from the users wishlist
export const DELETE_FROM_LIST = gql`
  mutation DeleteFromList($id: ID!) {
    deleteFromList(_id: $id) {
      _id
      wishList {
        category {
          name
        }
        title
        id
      }
    }
  }
`;
