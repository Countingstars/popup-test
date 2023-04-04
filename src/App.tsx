import './App.css';
import { popup } from './components/popup';
import SubComponent from './components/subComponent';

function App() {

  const clickHandler = () => {
    popup('popup from parent component');
  };

  return (
    <div className="App">
      <header className="App-header">

        <h3>It's parent component here</h3>
        <p>
          <button onClick={clickHandler}>click here to show popup</button>
        </p>
        <SubComponent />

      </header>
    </div>
  );
}

export default App;
