import type { Point } from "../api/types/datas";

/**
 * Преобразует дату из формата "ГГГГ-ММ-ДД" (из `<input type="date">`)
 * в числовой формат ГГГГММДД (например 19800101).
 *
 * @param date - Строка даты в формате "ГГГГ-ММ-ДД"
 * @returns Число в формате ГГГГММДД
 *
 * @example
 * inputDateToNumber("1980-01-01") // → 19800101
 * inputDateToNumber("2023-12-15") // → 20231215
 */
export function inputDateToNumber(date: string): number {
  const [year, month, day] = date.split('-').map(Number);
  return year * 10000 + month * 100 + day;
}

export const parseDate = (s: string) => {
  const [m, d, y] = s.split('.').map(Number); // "12.11.1984" → 11 декабря 1984
  return Date.UTC(y, m - 1, d);
};

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