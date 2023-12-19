import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <p>
          iLeave
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button type='primary'>Hello</Button>
      </header>
    </div>
  );
}

export default App;
