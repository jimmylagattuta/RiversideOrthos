import Navbar from './components/Navbar';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <Navbar />
        <h1>
          LA Orthos
        </h1>
        <div id="under-construction">
          <h3>(...Under Construction...)</h3><i className="fas fa-wrench fa-2x"></i><i className="fas fa-hard-hat fa-2x"></i>
        </div>
    </div>
  );
}

export default App;
