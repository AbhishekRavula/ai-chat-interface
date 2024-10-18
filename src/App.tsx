import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import ChatInterface from "./components/ChatInterface";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-paper">
        <ChatInterface />
      </div>
    </Provider>
  );
};

export default App;
