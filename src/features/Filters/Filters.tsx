import type { DateFilters } from "../../api/types/datas";

interface Props {
  value: DateFilters;
  onChange: (value: DateFilters) => void;
}

export function Filters({value, onChange}: Props) {
  
  return (
    <div style={{ width: '100%', height: 100 }}>
      <label>
        С{' '}
        <input
          type='date'
          placeholder="startDate"
          value={value.startDate}
          max={value.endDate || undefined}
          onChange={(e) => onChange({ ...value, startDate: e.target.value })}
        />
      </label>
      
      <label>
        {' '}До{' '}
        <input
          type='date'
          placeholder="endDate"
          value={value.endDate}
          min={value.startDate || undefined}
          onChange={(e) => onChange({ ...value, endDate: e.target.value })}
        />
      </label>
    </div>
    
  );
}