import { useMemo, useState } from 'react';
import { useGetDataQuery } from '../../api/services/dataApi';
import { Filters } from '../../features/Filters/Filters';
import { Chart } from '../../features/Chart/Chart';
import styles from './DataGraph.module.css';
import type { DateFilters } from '../../api/types/datas';
import { lttb } from '../../utils/utils';

export function DataGraph() {
  const { data: rowData, isLoading, isError, refetch } = useGetDataQuery();

  const [filters, setFilters] = useState<DateFilters>({startDate: '', endDate: ''})

  const chartData = useMemo(() => {
    if (!rowData) return [];
    const start = filters.startDate ? Date.parse(filters.startDate) : -Infinity;
    const end = filters.endDate ? Date.parse(filters.endDate) : Infinity;

    const filtered = rowData.filter((d) => d.ts >= start && d.ts <= end);
    return lttb(filtered, 800);
  }, [rowData, filters]);

  if (isLoading) {
    return <p className={styles.status}>Загрузка…</p>;
  }

  if (isError) {
    return (
      <div className={styles.status}>
        <p>Не удалось загрузить данные</p>
        <button onClick={() => refetch()}>Повторить</button>
      </div>
    );
  }

  if (!rowData?.length) {
    return <p className={styles.status}>Данных нет.</p>;
  }

  return (
    <div className={styles.chartData}>
      <h1>Данные</h1>
      <Filters value={filters} onChange={setFilters}/>
      {chartData.length === 0 ? (
        <p className={styles.status}>В выбранном диапазоне данных нет.</p>
      ) : (
        <Chart data={chartData} />
      )}
    </div>
  );
}
