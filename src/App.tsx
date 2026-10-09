import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { HomePage } from './pages/HomePage/HomePage';
import { DataGraph } from './pages/DataGraph/DataGraph';

function App() {
  return (
    <BrowserRouter>
      <main className={styles.main}>
        <nav className={styles.nav}>
          <Link to="/">Главная</Link>
          <Link to="/chart">График</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chart" element={<DataGraph />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;