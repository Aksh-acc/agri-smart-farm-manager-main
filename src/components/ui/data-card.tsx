
import { ReactNode } from 'react';

interface DataCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  className?: string;
}

const DataCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className = "",
}: DataCardProps) => {
  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            {trend && (
              <span className={`ml-2 text-sm font-medium ${trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} flex items-center`}>
                <svg
                  className={`h-4 w-4 ${trend.isPositive ? 'rotate-0' : 'rotate-180'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                <span>{Math.abs(trend.value)}%</span>
              </span>
            )}
          </div>
          {description && (
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {icon && (
          <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCard;
