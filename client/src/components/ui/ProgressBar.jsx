import React from 'react';

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  variant = 'primary', 
  size = 'medium',
  showLabel = true,
  animated = true,
  className = '',
  ...props 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const baseStyles = 'w-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700';
  
  const variants = {
    primary: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
  };

  const sizes = {
    small: 'h-2',
    medium: 'h-4',
    large: 'h-6',
  };

  const animation = animated ? 'transition-all duration-500' : '';

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`${baseStyles} ${sizes[size]} ${className}`} {...props}>
        <div 
          className={`${variants[variant]} ${sizes[size]} ${animation}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {size === 'large' && showLabel && (
            <span className="px-2 text-sm text-white">{Math.round(percentage)}%</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;