import React from 'react';
import { ListTodo, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Sidebar = ({ stats }) => {
  const statCards = [
    {
      label: 'Tasks Left',
      value: stats.left,
      color: 'yellow',
      icon: AlertCircle,
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400',
      iconBg: 'bg-yellow-100 dark:bg-yellow-900/40',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      color: 'blue',
      icon: Clock,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-900/40',
    },
    {
      label: 'Completed',
      value: stats.completed,
      color: 'green',
      icon: CheckCircle,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
      iconBg: 'bg-green-100 dark:bg-green-900/40',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-20">
      <div className="flex items-center mb-6">
        <ListTodo className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Task Statistics
        </h2>
      </div>
      
      <div className="space-y-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`${stat.bgColor} rounded-lg p-4 transition-all duration-200 hover:scale-105`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`${stat.iconBg} p-2 rounded-lg`}>
                    <Icon className={`h-5 w-5 ${stat.textColor}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {stat.label}
                  </span>
                </div>
                <span className={`text-3xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Tasks
          </span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.left + stats.inProgress + stats.completed}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;