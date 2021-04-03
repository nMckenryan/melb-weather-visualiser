import './App.css';
import AirInfo from './components/AirInfo.component';

function App() {
  return (
    <div className="App">
      <h3>No Frills Weather App - Deluxe Melbourne Edition</h3>
      <small>Now with Three Exclusive Colors! Hover over a dot to find out more details</small>
      <AirInfo></AirInfo>
    </div>
  );
}

export default App;
