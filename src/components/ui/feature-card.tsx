
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ComponentType } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon | ComponentType<any>;
  to: string;
  iconColor?: string;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  to,
  iconColor = "text-primary-600",
}: FeatureCardProps) => {
  return (
    <Link 
      to={to}
      className="glass-card p-6 hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
    >
      <div className={`rounded-full p-3 w-12 h-12 flex items-center justify-center ${iconColor} bg-primary-50 dark:bg-primary-900/20 mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">{title}</h3>
      <p className="text-muted-foreground flex-grow">{description}</p>
      <div className="mt-4 text-primary-600 font-medium inline-flex items-center">
        Learn more
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:ml-2 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </Link>
  );
};

export default FeatureCard;
