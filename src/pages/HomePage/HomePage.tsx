import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.page}>
      <h1>Главная</h1>
      <p>Тестовый проект для подготовки к собеседованию.</p>
      <Link to="/users" className={styles.link}>
        Перейти к пользователям →
      </Link>
    </div>
  );
}