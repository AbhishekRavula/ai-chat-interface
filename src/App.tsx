import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import ChatInterface from "./components/ChatInterface";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ChatInterface />
    </Provider>
  );
};

export default App;
