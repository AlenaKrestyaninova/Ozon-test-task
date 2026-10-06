import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { HomePage } from './pages/HomePage/HomePage';
import { UsersPage } from './pages/Users/UsersPage';

function App() {
  return (
    <BrowserRouter>
      <main className={styles.main}>
        <nav className={styles.nav}>
          <Link to="/">Главная</Link>
          <Link to="/users">Пользователи</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;