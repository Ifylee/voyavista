import { createContext, useReducer, useContext } from "react";
import { reducer, initialState } from "./reducers.js";

// creates the context
const GlobalStateContext = createContext();

// Custom hook to use the GlobalState
export const useGlobalState = () => useContext(GlobalStateContext);

// This creates a provider component
// eslint-disable-next-line react/prop-types
export const GlobalStateProvider = ({ children }) => {
  // Use the globalStateReducer to manage state
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalStateContext.Provider>
  );
};