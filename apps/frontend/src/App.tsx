import { Provider } from 'jotai';
import { MoviesController } from './features/movies';
import './App.css';

function App() {
  return (
    <Provider>
      <div className="App">
        <MoviesController />
      </div>
    </Provider>
  );
}

export default App
