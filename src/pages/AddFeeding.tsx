import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useRecords } from '../context/RecordContext';
import type { FeedingType } from '../types';
import { FEEDING_TYPES } from '../types';

export default function AddFeeding() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addRecord, updateRecord, records } = useRecords();
  
  const isEdit = !!id;
  
  // 初始化表单值
  const existingRecord = isEdit ? records.find(r => r.id === id && r.type === 'feeding') : null;
  const [type, setType] = useState<FeedingType>(
    isEdit && existingRecord ? (existingRecord.data as any).type : 'formula'
  );
  const [amount, setAmount] = useState<string>(
    isEdit && existingRecord ? ((existingRecord.data as any).amount?.toString() || '') : ''
  );
  const [timestamp, setTimestamp] = useState<number>(
    isEdit && existingRecord ? existingRecord.timestamp : Date.now()
  );

  useEffect(() => {
    if (isEdit && records.length > 0 && !existingRecord) {
      navigate('/');
    }
  }, [isEdit, existingRecord, navigate, records.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const recordData = {
      type: 'feeding' as const,
      timestamp,
      data: {
        type,
        amount: amount ? parseInt(amount) : undefined,
      },
    };

    if (isEdit && existingRecord) {
      updateRecord({
        ...existingRecord,
        ...recordData,
      });
    } else {
      addRecord({
        id: Date.now().toString(),
        ...recordData,
      });
    }
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-600 dark:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold text-pink-800 dark:text-pink-200">
            {isEdit ? '编辑喝奶记录' : '记录喝奶'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm transition-colors duration-300">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">喝奶类型</label>
            <div className="space-y-2">
              {FEEDING_TYPES.map((t) => (
                <label
                  key={t.value}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    type === t.value
                      ? 'border-pink-400 bg-pink-50 dark:border-pink-500 dark:bg-pink-900/20'
                      : 'border-gray-200 dark:border-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={t.value}
                    checked={type === t.value}
                    onChange={(e) => setType(e.target.value as FeedingType)}
                    className="mr-3"
                  />
                  <span className="font-medium text-gray-700 dark:text-gray-200">{t.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm transition-colors duration-300">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">喝奶量（毫升）</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="例如：120"
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500 focus:border-transparent outline-none bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 transition-colors"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm transition-colors duration-300">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">时间</label>
            <input
              type="datetime-local"
              value={dayjs(timestamp).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => setTimestamp(new Date(e.target.value).getTime())}
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500 focus:border-transparent outline-none bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-pink-500 dark:from-pink-500 dark:to-pink-600 text-white py-4 rounded-xl font-medium text-lg shadow-md active:scale-95 transition-all duration-200"
          >
            {isEdit ? '保存修改' : '保存记录'}
          </button>
        </form>
      </div>
    </div>
  );
}
