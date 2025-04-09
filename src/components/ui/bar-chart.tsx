
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface BarChartProps {
  data: Array<Record<string, any>>;
  dataKey: string;
  nameKey?: string;
  bars: Array<{
    dataKey: string;
    fill?: string;
    name?: string;
  }>;
  title?: string;
  subtitle?: string;
  className?: string;
  height?: number | string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 shadow-lg border border-border">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="flex items-center space-x-2 mt-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <p className="text-sm">
              {entry.name}: <span className="font-medium">{entry.value}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const BarChart = ({
  data,
  dataKey,
  nameKey = "name",
  bars,
  title,
  subtitle,
  className = "",
  height = 400,
}: BarChartProps) => {
  return (
    <div className={className}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div className="bg-white dark:bg-card rounded-lg p-4 border border-border shadow-sm">
        <ResponsiveContainer width="100%" height={height}>
          <RechartsBarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color, #e5e7eb)" opacity={0.6} />
            <XAxis 
              dataKey={nameKey} 
              tick={{ fill: 'var(--muted-foreground)' }}
              axisLine={{ stroke: 'var(--border-color, #e5e7eb)' }}
              tickLine={{ stroke: 'var(--border-color, #e5e7eb)' }}
            />
            <YAxis 
              tick={{ fill: 'var(--muted-foreground)' }}
              axisLine={{ stroke: 'var(--border-color, #e5e7eb)' }}
              tickLine={{ stroke: 'var(--border-color, #e5e7eb)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '15px' }} />
            {bars.map((bar, index) => (
              <Bar 
                key={`bar-${index}`} 
                dataKey={bar.dataKey} 
                fill={bar.fill || `var(--chart-color-${index + 1}, #4caf50)`} 
                name={bar.name || bar.dataKey} 
                radius={[4, 4, 0, 0]}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
