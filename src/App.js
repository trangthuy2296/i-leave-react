import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <p>
          ileave
        </p>
        <Button type='primary'>Leave</Button>
      </header>
    </div>
  );
}

export default App;
