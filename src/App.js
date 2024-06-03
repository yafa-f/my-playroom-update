import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { BaseScreen } from './components/BaseScreen';

function App() {
  return (
    <BrowserRouter>
      <BaseScreen/>  
  </BrowserRouter>
  );
}

export default App;
