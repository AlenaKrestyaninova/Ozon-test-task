export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  stock: number;
}

// Начальные данные. Хранятся в памяти — после перезапуска сервера всё сбрасывается.
export const products: Product[] = [
  { id: 1, title: 'Смартфон Galaxy A55', price: 32990, category: 'Электроника', stock: 14 },
  { id: 2, title: 'Наушники AirSound Pro', price: 7490, category: 'Электроника', stock: 0 },
  { id: 3, title: 'Ноутбук ZenBook 14', price: 89990, category: 'Электроника', stock: 5 },
  { id: 4, title: 'Умная колонка Мини', price: 4990, category: 'Электроника', stock: 32 },
  { id: 5, title: 'Чистый код', price: 1290, category: 'Книги', stock: 21 },
  { id: 6, title: 'Грокаем алгоритмы', price: 990, category: 'Книги', stock: 8 },
  { id: 7, title: 'Мастер и Маргарита', price: 450, category: 'Книги', stock: 40 },
  { id: 8, title: 'Сковорода 28 см', price: 2390, category: 'Дом', stock: 12 },
  { id: 9, title: 'Набор полотенец', price: 1590, category: 'Дом', stock: 0 },
  { id: 10, title: 'Настольная лампа', price: 2790, category: 'Дом', stock: 7 },
  { id: 11, title: 'Худи оверсайз', price: 3490, category: 'Одежда', stock: 19 },
  { id: 12, title: 'Кроссовки беговые', price: 6990, category: 'Одежда', stock: 3 },
];
