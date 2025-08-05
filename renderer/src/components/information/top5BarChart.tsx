import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';

const COLORS = ['#93B5C6', '#C9CCD5', '#E4D8DC', '#FFE3E3', '#A1C6EA'];

type Top5BarChartProps = {
  data: any[];
  labelKey: string;
  valueKey: string;
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
        <Bar dataKey={valueKey} radius={[4, 4, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
