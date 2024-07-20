import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import { store } from './app/store';
import GlobalStyles from './styles/GlobalStyles';
import { TemperatureProvider } from './components/TemperatureSwitch';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
      <TemperatureProvider>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </TemperatureProvider>
      </Router>
    </Provider>
  );
};

export default App;
