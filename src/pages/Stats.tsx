import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useRecords } from '../context/RecordContext';
import { useTheme } from '../context/ThemeContext';

// 设置中文locale
dayjs.locale('zh-cn');

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TimeRange = 'day' | 'week' | 'month';

export default function Stats() {
  const { records } = useRecords();
  const { isDarkMode } = useTheme();
  const [range, setRange] = useState<TimeRange>('week');

  const stats = useMemo(() => {
    let startTime: number;
    
    switch (range) {
      case 'day':
        startTime = dayjs().startOf('day').valueOf();
        break;
      case 'week':
        startTime = dayjs().startOf('week').valueOf();
        break;
      case 'month':
        startTime = dayjs().startOf('month').valueOf();
        break;
      default:
        startTime = dayjs().startOf('week').valueOf();
    }

    const filteredRecords = records.filter(r => r.timestamp >= startTime);
    
    const feedingRecords = filteredRecords.filter(r => r.type === 'feeding');
    const poopRecords = filteredRecords.filter(r => r.type === 'poop');
    
    const totalFeedingAmount = feedingRecords.reduce((sum, r) => {
      const data = r.data as any;
      return sum + (data.amount || 0);
    }, 0);

    return {
      feedingCount: feedingRecords.length,
      poopCount: poopRecords.length,
      totalFeedingAmount,
      filteredRecords,
    };
  }, [records, range]);

  const chartData = useMemo(() => {
    const now = dayjs();
    let labels: string[] = [];
    let feedingData: number[] = [];
    let poopData: number[] = [];

    if (range === 'day') {
      for (let i = 0; i < 24; i++) {
        labels.push(`${i}:00`);
        const hourStart = now.hour(i).minute(0).second(0).valueOf();
        const hourEnd = now.hour(i).minute(59).second(59).valueOf();
        const hourRecords = stats.filteredRecords.filter(
          r => r.timestamp >= hourStart && r.timestamp <= hourEnd
        );
        feedingData.push(hourRecords.filter(r => r.type === 'feeding').length);
        poopData.push(hourRecords.filter(r => r.type === 'poop').length);
      }
    } else if (range === 'week') {
      const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
      for (let i = 0; i < 7; i++) {
        const day = now.day(i);
        labels.push(`周${weekDays[i]}`);
        const dayStart = day.startOf('day').valueOf();
        const dayEnd = day.endOf('day').valueOf();
        const dayRecords = stats.filteredRecords.filter(
          r => r.timestamp >= dayStart && r.timestamp <= dayEnd
        );
        feedingData.push(dayRecords.filter(r => r.type === 'feeding').length);
        poopData.push(dayRecords.filter(r => r.type === 'poop').length);
      }
    } else {
      const daysInMonth = now.daysInMonth();
      for (let i = 1; i <= daysInMonth; i++) {
        labels.push(`${i}日`);
        const day = now.date(i);
        const dayStart = day.startOf('day').valueOf();
        const dayEnd = day.endOf('day').valueOf();
        const dayRecords = stats.filteredRecords.filter(
          r => r.timestamp >= dayStart && r.timestamp <= dayEnd
        );
        feedingData.push(dayRecords.filter(r => r.type === 'feeding').length);
        poopData.push(dayRecords.filter(r => r.type === 'poop').length);
      }
    }

    return {
      labels,
      feedingData,
      poopData,
    };
  }, [stats.filteredRecords, range]);

  const lineChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: '喝奶次数',
        data: chartData.feedingData,
        borderColor: '#f472b6',
        backgroundColor: 'rgba(244, 114, 182, 0.1)',
        tension: 0.4,
      },
      {
        label: '大便次数',
        data: chartData.poopData,
        borderColor: '#fbbf24',
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#e2e8f0' : '#374151',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? '#94a3b8' : '#6b7280',
        },
        grid: {
          color: isDarkMode ? '#334155' : '#e5e7eb',
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? '#94a3b8' : '#6b7280',
        },
        grid: {
          color: isDarkMode ? '#334155' : '#e5e7eb',
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 pb-24 transition-colors duration-300">
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">数据统计</h1>

        <div className="flex gap-2 mb-6">
          {(['day', 'week', 'month'] as TimeRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`flex-1 py-2 rounded-lg font-medium transition-all duration-200 ${
                range === r
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700'
              }`}
            >
              {r === 'day' ? '今天' : r === 'week' ? '本周' : '本月'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-sm transition-colors duration-300">
            <div className="text-2xl font-bold text-pink-500">{stats.totalFeedingAmount}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">喝奶量(ml)</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-sm transition-colors duration-300">
            <div className="text-2xl font-bold text-yellow-500">{stats.poopCount}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">大便次数</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-sm transition-colors duration-300">
            <div className="text-2xl font-bold text-blue-500">{stats.feedingCount}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">喝奶次数</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm transition-colors duration-300">
          <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-4">趋势图</h3>
          <Line data={lineChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
