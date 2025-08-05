import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';


export default function CustomLineChart({ data, customColor = "#93B5C6" }: { data: { day: string, total: number }[]; customColor?: string }) {
  //Color must be SAFE \n was breaking my id earlier, the linear gradient id
  //svg gradients need an id to work
  const safeColor = customColor.replace(/[^a-zA-Z0-9]/g, '');
  const gradientId = `colorTotal_${safeColor}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={customColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={customColor} stopOpacity={0} />
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
            border: `1px solid ${customColor}`,
            borderRadius: 4,
            fontSize: '14px',
          }}
          labelStyle={{ fontSize: '12px', color: '#333' }}
          //Here im already inside a javascript object so don't need to use {}
          itemStyle={{ fontSize: '16px', color: customColor }}
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Total']}
        />
        <Area
          type="monotone"
          dataKey="total"
          stroke={customColor}
          fill={`url(#${gradientId})`}
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
