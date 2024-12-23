import {
    SET_TRIPS,
    ADD_TRIP_TO_CART,
    REMOVE_TRIP_FROM_CART,
    SET_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    CLEAR_CART,
  } from "./actions";
  
  // This will be our intial state and the different states that we want to keep track of
  export const initialState = {
    cart: [],
    isAuthenticated: false,
    trips: [],
    categories: [],
    currentCategory: "",
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      // This will save all the trips to global state
      case SET_TRIPS:
        return {
          ...state,
          trips: action.payload, // Set the entire trips array
        };
      case ADD_TRIP_TO_CART:
        return {
          // This will update the cart property
          ...state,
          cart: state.cart.some((item) => item.id === action.payload.id)
            ? state.cart // If the item already exists, return the current cart unchanged
            : [...state.cart, action.payload], // Otherwise, add the new item
        };
      case REMOVE_TRIP_FROM_CART:
        // This will filter through the cart and take out the trip from the payload
        let updatedCart = state.cart.filter((trip) => trip.id !== action.payload); // Remove a trip by id
        return {
          ...state,
          cart: updatedCart,
        };
      case CLEAR_CART:
        return {
          ...state,
          // Empties the cart
          cart: [],
        };
      case SET_CATEGORIES:
        return {
          ...state,
          // Sets the categories to global state
          categories: [...action.payload], // Set the entire categories array
        };
      case UPDATE_CURRENT_CATEGORY:
        return {
          ...state,
          // Updates current cateogry depending on its id
          currentCategory: action.payload, //updates the category selected
        };
  
      default:
        console.error(`Unhandled action type: ${action.type}`);
        return state;
    }
  };
  
  