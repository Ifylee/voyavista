import { gql } from "@apollo/client";

// Fetches all the trips and the corresponding data from the db
export const QUERY_ALL_TRIPS = gql`
  query AllTrips {
    allTrips {
      title
      summary
      price
      img
      id
      description
      category {
        id
        name
      }
    }
  }
`;

// Fetches all the categories along with its name from the db
export const QUERY_CATEGORY = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;

// Finds the current users that is logged in information
export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      _id
      firstName
      purchased {
        category {
          name
        }
        description
        img
        price
        summary
        title
        id
      }
      wishList {
        category {
          name
        }
        description
        id
        img
        price
        summary
        title
      }
    }
  }
`;

// This takes a parameter of a trips id and will return the data that corresponds to it
export const ONE_TRIP = gql`
  query OneTrip($id: ID!) {
    oneTrip(_id: $id) {
      category {
        name
      }
      description
      id
      img
      additionalImages
      groupSize
      price
      summary
      title
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;
