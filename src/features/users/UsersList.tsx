import { useGetUsersQuery } from '../../api/services/usersApi';
import styles from './UsersList.module.css';

export function UsersList() {
  const { data: users, isLoading, isError, refetch } = useGetUsersQuery();

  if (isLoading) {
    return <p className={styles.status}>Загрузка…</p>;
  }

  if (isError) {
    return (
      <div className={styles.status}>
        <p>Не удалось загрузить пользователей.</p>
        <button onClick={refetch}>Повторить</button>
      </div>
    );
  }

  if (!users?.length) {
    return <p className={styles.status}>Пользователей нет.</p>;
  }

  return (
    <ul className={styles.list}>
      {users.map((user) => (
        <li key={user.id} className={styles.item}>
          <strong>{user.name}</strong>
          <span>{user.email}</span>
          <span className={styles.company}>{user.company.name}</span>
        </li>
      ))}
    </ul>
  );
}