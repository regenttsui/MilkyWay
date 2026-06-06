import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useRecords } from '../context/RecordContext';
import type { FeedingType } from '../types';
import { FEEDING_TYPES } from '../types';

export default function AddFeeding() {
  const navigate = useNavigate();
  const { addRecord } = useRecords();
  const [type, setType] = useState<FeedingType>('formula');
  const [amount, setAmount] = useState('');
  const [timestamp, setTimestamp] = useState(Date.now());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const record = {
      id: Date.now().toString(),
      type: 'feeding' as const,
      timestamp,
      data: {
        type,
        amount: amount ? parseInt(amount) : undefined,
      },
    };
    addRecord(record);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-600 p-2"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold text-pink-800">记录喝奶</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-3">喝奶类型</label>
            <div className="space-y-2">
              {FEEDING_TYPES.map((t) => (
                <label
                  key={t.value}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    type === t.value ? 'border-pink-400 bg-pink-50' : 'border-gray-200'
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
                  <span className="font-medium">{t.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-3">喝奶量（毫升）</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="例如：120"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
            />
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-3">时间</label>
            <input
              type="datetime-local"
              value={dayjs(timestamp).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => setTimestamp(new Date(e.target.value).getTime())}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-4 rounded-xl font-medium text-lg shadow-md active:scale-95 transition-transform"
          >
            保存记录
          </button>
        </form>
      </div>
    </div>
  );
}
