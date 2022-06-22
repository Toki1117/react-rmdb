import React from 'react';

// Components
import Header from "./components/Header";

// Styles
// it's a wrapping div with general style
import { GlobalStyle } from "./GlobalStyle";

function App() {
  return (
    <div className="App">
      <Header />
      <GlobalStyle/>
    </div>
  );
}

export default App;
