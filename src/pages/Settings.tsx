import React, { useState } from 'react';
import { exportData, importData } from '../utils/storage';
import { useRecords } from '../context/RecordContext';

export default function Settings() {
  const { loadRecords } = useRecords();
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-violet-50">
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">设置</h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="font-medium text-gray-700 mb-3">数据管理</h3>
            
            <div className="space-y-3">
              <button
                onClick={handleExport}
                className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                📤 导出数据
              </button>

              <label className="block">
                <span className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center cursor-pointer">
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

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="font-medium text-gray-700 mb-3">关于</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>MilkyWay</strong> - 婴儿记录助手</p>
              <p>帮助您轻松记录宝宝的喝奶和大便情况</p>
              <p className="text-gray-400">版本 1.0.0</p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-400 pt-4">
            <p>数据安全地存储在本地设备上</p>
            <p>不会上传到任何服务器</p>
          </div>
        </div>
      </div>
    </div>
  );
}
