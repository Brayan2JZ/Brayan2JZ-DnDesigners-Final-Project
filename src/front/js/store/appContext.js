import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it
const injectContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
    // Initialize state with a store for global state management
    const [state, setState] = useState(
      getState({
        getStore: () => state.store,
        getActions: () => state.actions,
        setStore: (updatedStore) =>
          setState({
            store: Object.assign(state.store, updatedStore),
            actions: { ...state.actions },
          }),
      })
    );

    useEffect(() => {
      // Check for the token in localStorage when the app first loads
      const token = localStorage.getItem('token');
      if (token) {
        state.actions.setIsLoggedIn(true); // Set login state to true if token exists
      }

      // Uncomment this if you have a message fetch action to call on load
      // state.actions.getMessage(); // <---- Calling this function from the flux.js actions

    }, []); // Empty array ensures this runs only once after the component mounts

    // Return the context provider to wrap your app and provide global state
    return (
      <Context.Provider value={state}>
        <PassedComponent {...props} />
      </Context.Provider>
    );
  };
  return StoreWrapper;
};

export default injectContext;