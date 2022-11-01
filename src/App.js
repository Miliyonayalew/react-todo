import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import TodoContainer from './Components/TodoContainer';

function App() {
  return (
    <div className="App">
      <Router>
        <TodoContainer />
      </Router>
    </div>
  );
}

export default App;
