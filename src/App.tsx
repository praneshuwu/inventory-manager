import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './store/store';

// ideally where all the routing should be
function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
