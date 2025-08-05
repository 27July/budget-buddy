import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

type Top5BarChartProps = {
  data: any[];
  labelKey: string; // e.g., "Name" or "transactionName"
  valueKey: string; // e.g., "total" or "amount"
};

export default function Top5BarChart({ data, labelKey, valueKey }: Top5BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 20, left: -10, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={labelKey}
          tick={{ fontSize: 12 }}
          interval={0}
          angle={-30}
          textAnchor="end"
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
          wrapperStyle={{
            backgroundColor: 'white',
            border: '1px solid #93B5C6',
            borderRadius: 4,
            fontSize: '14px',
          }}
          labelStyle={{ fontSize: '12px', color: '#333' }}
          itemStyle={{ fontSize: '12px', color: '#93B5C6' }}
        />
        <Bar dataKey={valueKey} fill="#93B5C6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
