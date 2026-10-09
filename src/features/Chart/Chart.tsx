import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import type { Point } from '../../api/types/datas';

interface Props {
  data: Point[]
}

const formatDate = (ts: number) => new Date(ts).toLocaleDateString('ru-RU');

export function Chart({data}: Props) {

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="ts"
            type="number"
            scale="time"
            domain={['dataMin', 'dataMax']}
            tickFormatter={formatDate}
          />
          <YAxis />
          <Tooltip labelFormatter={(label) => formatDate(Number(label))} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
      
    </div>
    
  );
}
