import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const COLORS = [
  '#93B5C6', '#C9CCD5', '#E4D8DC', '#FFE3E3', '#A1C6EA',
  '#F7CAC9', '#D6D1B1', '#B8E0D2', '#B5EAD7', '#FFDAC1',
];

export default function CustomPieChart({
  data,
}: {
  data: { categoryName: string; total: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="categoryName"
          cx="50%"
          cy="50%"
          outerRadius={50}>
          {data?.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Total']}
          wrapperStyle={{
            backgroundColor: 'white',
            border: '1px solid #93B5C6',
            borderRadius: 4,
            fontSize: '14px',
          }}
        />
        <Legend
        wrapperStyle={{ fontSize: '12px' }} // or smaller like '10px'
        formatter={(value) => <span style={{ fontSize: '12px' }}>{value === 'total' ? 'Total' : value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
