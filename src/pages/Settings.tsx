import { useState } from 'react';
import { exportData, importData } from '../utils/storage';
import { useRecords } from '../context/RecordContext';
import { useTheme } from '../context/ThemeContext';

type Theme = 'light' | 'dark' | 'system';

const themeOptions: { value: Theme; label: string; icon: string }[] = [
  { value: 'light', label: '浅色模式', icon: '☀️' },
  { value: 'dark', label: '深色模式', icon: '🌙' },
  { value: 'system', label: '跟随系统', icon: '⚙️' },
];

export default function Settings() {
  const { loadRecords } = useRecords();
  const { theme, setTheme } = useTheme();
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleExport = () => {
    try {
      const data = exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `milkyway-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setMessage({ text: '数据导出成功！', type: 'success' });
    } catch {
      setMessage({ text: '数据导出失败', type: 'error' });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result as string;
        const success = importData(data);
        if (success) {
          loadRecords();
          setMessage({ text: '数据导入成功！', type: 'success' });
        } else {
          setMessage({ text: '数据格式不正确', type: 'error' });
        }
      } catch {
        setMessage({ text: '数据导入失败', type: 'error' });
      }
      setTimeout(() => setMessage(null), 3000);
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-violet-50 dark:from-slate-900 dark:to-slate-800 pb-24 transition-colors duration-300">
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">设置</h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-6">
          {/* Theme Switcher */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm transition-colors duration-300">
            <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-4">主题设置</h3>
            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                    theme === option.value
                      ? 'border-purple-500 bg-purple-50 dark:border-purple-400 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500'
                  }`}
                >
                  <span className="text-2xl mb-1">{option.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm transition-colors duration-300">
            <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-4">数据管理</h3>
            
            <div className="space-y-3">
              <button
                onClick={handleExport}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200"
              >
                📤 导出数据
              </button>

              <label className="block">
                <span className="w-full py-3 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center cursor-pointer">
                  📥 导入数据
                </span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* About */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm transition-colors duration-300">
            <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-4">关于</h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p><strong>MilkyWay</strong> - 婴儿记录助手</p>
              <p>帮助您轻松记录宝宝的喝奶和大便情况</p>
              <p className="text-gray-500 dark:text-gray-500">版本 1.0.0</p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4">
            <p>数据安全地存储在本地设备上</p>
            <p>不会上传到任何服务器</p>
          </div>
        </div>
      </div>
    </div>
  );
}
