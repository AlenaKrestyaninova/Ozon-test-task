import type { Point } from "../api/types/datas";

/**
 * Преобразует дату из формата "ММ_ДД_ГГГГ" в объект Date.
 *
 * @param date - Строка даты в формате "ММ_ДД_ГГГГ"
 * @returns дата в формате Date
 *
 * @example
 * parseDate("12.11.1984") // → 11 декабря 1984
 */
export const parseDate = (s: string) => {
  const [m, d, y] = s.split('.').map(Number);
  return Date.UTC(y, m - 1, d);
};

/**
 * Прореживает временной ряд алгоритмом LTTB (Largest Triangle Three Buckets).
 *
 * Данные делятся на корзины, и из каждой выбирается точка, которая вместе с
 * ранее выбранной точкой и средней точкой следующей корзины образует
 * треугольник наибольшей площади. Благодаря этому сохраняются пики и впадины,
 * то есть общая форма графика.
 *
 * Первая и последняя точки всегда попадают в результат. Исходный массив
 * не изменяется.
 *
 * Сложность: O(n) по времени, O(threshold) по дополнительной памяти.
 *
 * @param data Точки временного ряда. Должны быть отсортированы по `ts` по возрастанию.
 * @param threshold Желаемое количество точек в результате (минимум 3).
 * @returns Прореженный массив длиной `threshold`. Если `threshold` меньше 3
 * или не меньше длины `data`, возвращается исходный массив без изменений.
 *
 * @example
 * const reduced = lttb(points, 800); // 15000 точек → 800
 *
 * @see https://github.com/sveinn-steinarsson/flot-downsample
 */
export function lttb(data: Point[], threshold: number): Point[] {
  const n = data.length;
  if (threshold >= n || threshold < 3) return data;

  const sampled: Point[] = [data[0]];
  const bucketSize = (n - 2) / (threshold - 2);
  let a = 0; // индекс последней выбранной точки

  for (let i = 0; i < threshold - 2; i++) {
    // среднее по следующей корзине
    const nextStart = Math.floor((i + 1) * bucketSize) + 1;
    const nextEnd = Math.min(Math.floor((i + 2) * bucketSize) + 1, n);
    let avgX = 0, avgY = 0;
    for (let j = nextStart; j < nextEnd; j++) {
      avgX += data[j].ts;
      avgY += data[j].value;
    }
    const len = nextEnd - nextStart;
    avgX /= len;
    avgY /= len;

    // в текущей корзине берём точку, образующую самый большой треугольник
    const start = Math.floor(i * bucketSize) + 1;
    const end = Math.floor((i + 1) * bucketSize) + 1;
    let maxArea = -1, maxIdx = start;
    for (let j = start; j < end; j++) {
      const area = Math.abs(
        (data[a].ts - avgX) * (data[j].value - data[a].value) -
        (data[a].ts - data[j].ts) * (avgY - data[a].value),
      );
      if (area > maxArea) { maxArea = area; maxIdx = j; }
    }
    sampled.push(data[maxIdx]);
    a = maxIdx;
  }

  sampled.push(data[n - 1]);
  return sampled;
}