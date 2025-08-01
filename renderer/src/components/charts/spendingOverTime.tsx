// src/components/SpendingOverTimeChart.tsx
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';


export default function SpendingOverTimeChart({ data }: { data: { day: string, total: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#93B5C6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#93B5C6" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          tickFormatter={(d) => d.slice(5)}
          tick={{ fontSize: 12 }}
        />

        <YAxis tick={{ fontSize: 12 }} />

        <Tooltip
          wrapperStyle={{
            backgroundColor: 'white',
            border: '1px solid #93B5C6',
            borderRadius: 4,
            fontSize: '14px',
          }}
          labelStyle={{ fontSize: '12px', color: '#333' }}
          itemStyle={{ fontSize: '16px', color: '#93B5C6' }}
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Total']}
        />
        <Area
          type="monotone"
          dataKey="total"
          stroke="#93B5C6"
          fill="url(#colorTotal)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
