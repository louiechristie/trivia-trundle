import React, { useReducer } from 'react';

import { state } from './QuestionsContext';

export default (reducer, actions, initialState: state) => {
  const Context = React.createContext(initialState);

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions = {};
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};
