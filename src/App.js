import "./Weather.css";
import Weather from "./Weather";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🌤️ Weather Report</h1>
        <p>Search any city for real-time weather</p>
      </header>

      <main>
        <Weather />
      </main>

      <footer className="app-footer">
        <small>Data from OpenWeatherMap</small>
      </footer>
    </div>
  );
}

export default App;
