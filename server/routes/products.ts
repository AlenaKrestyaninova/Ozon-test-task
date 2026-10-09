import { Router } from 'express';
import { products, type Product } from '../data/products.ts';

type ProductInput = Omit<Product, 'id'>;

const rules: Record<keyof ProductInput, (value: unknown) => boolean> = {
  title: (v) => typeof v === 'string' && v.trim() !== '',
  price: (v) => typeof v === 'number' && v >= 0,
  category: (v) => typeof v === 'string' && v.trim() !== '',
  stock: (v) => Number.isInteger(v) && (v as number) >= 0,
};

// partial = true для PATCH: проверяем только присланные поля
function validate(body: Record<string, unknown>, partial: boolean): string | null {
  for (const [field, isValid] of Object.entries(rules)) {
    if (partial && body[field] === undefined) continue;
    if (!isValid(body[field])) return `Некорректное поле: ${field}`;
  }
  return null;
}

// Берём из тела запроса только известные поля, остальное игнорируем
function pickInput(body: Record<string, unknown>): Partial<ProductInput> {
  return Object.fromEntries(
    Object.keys(rules)
      .filter((field) => body[field] !== undefined)
      .map((field) => [field, body[field]]),
  );
}

let nextId = Math.max(0, ...products.map((p) => p.id)) + 1;

export const productsRouter = Router();

// GET /api/products?search=...&category=...
productsRouter.get('/', (req, res) => {
  const search = String(req.query.search ?? '').trim().toLowerCase();
  const category = String(req.query.category ?? '');

  const result = products.filter(
    (p) =>
      (!search || p.title.toLowerCase().includes(search)) &&
      (!category || p.category === category),
  );

  res.json(result);
});

// GET /api/products/:id
productsRouter.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) {
    res.status(404).json({ message: 'Товар не найден' });
    return;
  }
  res.json(product);
});

// POST /api/products
productsRouter.post('/', (req, res) => {
  const body = req.body ?? {};
  const error = validate(body, false);
  if (error) {
    res.status(400).json({ message: error });
    return;
  }

  const product = { id: nextId++, ...pickInput(body) } as Product;
  products.push(product);
  res.status(201).json(product);
});

// PATCH /api/products/:id
productsRouter.patch('/:id', (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) {
    res.status(404).json({ message: 'Товар не найден' });
    return;
  }

  const body = req.body ?? {};
  const error = validate(body, true);
  if (error) {
    res.status(400).json({ message: error });
    return;
  }

  Object.assign(product, pickInput(body));
  res.json(product);
});

// DELETE /api/products/:id
productsRouter.delete('/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) {
    res.status(404).json({ message: 'Товар не найден' });
    return;
  }
  products.splice(index, 1);
  res.status(204).end();
});
