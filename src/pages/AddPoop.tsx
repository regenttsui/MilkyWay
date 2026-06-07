import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useRecords } from '../context/RecordContext';
import { POOP_SHAPES, POOP_COLORS } from '../types';

export default function AddPoop() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addRecord, updateRecord, records } = useRecords();
  
  const isEdit = !!id;
  
  // 初始化表单值
  const existingRecord = isEdit ? records.find(r => r.id === id && r.type === 'poop') : null;
  const [shape, setShape] = useState<string>(
    isEdit && existingRecord ? (existingRecord.data as any).shape : POOP_SHAPES[0]
  );
  const [color, setColor] = useState<string>(
    isEdit && existingRecord ? (existingRecord.data as any).color : POOP_COLORS[0]
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
      type: 'poop' as const,
      timestamp,
      data: {
        shape,
        color,
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
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-600 dark:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
            {isEdit ? '编辑大便记录' : '记录大便'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm transition-colors duration-300">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">形状</label>
            <div className="space-y-2">
              {POOP_SHAPES.map((s) => (
                <label
                  key={s}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    shape === s
                      ? 'border-yellow-400 bg-yellow-50 dark:border-yellow-500 dark:bg-yellow-900/20'
                      : 'border-gray-200 dark:border-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="shape"
                    value={s}
                    checked={shape === s}
                    onChange={(e) => setShape(e.target.value)}
                    className="mr-3"
                  />
                  <span className="font-medium text-gray-700 dark:text-gray-200">{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm transition-colors duration-300">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">颜色</label>
            <div className="space-y-2">
              {POOP_COLORS.map((c) => (
                <label
                  key={c}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    color === c
                      ? 'border-yellow-400 bg-yellow-50 dark:border-yellow-500 dark:bg-yellow-900/20'
                      : 'border-gray-200 dark:border-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="color"
                    value={c}
                    checked={color === c}
                    onChange={(e) => setColor(e.target.value)}
                    className="mr-3"
                  />
                  <span className="font-medium text-gray-700 dark:text-gray-200">{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm transition-colors duration-300">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">时间</label>
            <input
              type="datetime-local"
              value={dayjs(timestamp).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => setTimestamp(new Date(e.target.value).getTime())}
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-500 focus:border-transparent outline-none bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 text-white py-4 rounded-xl font-medium text-lg shadow-md active:scale-95 transition-all duration-200"
          >
            {isEdit ? '保存修改' : '保存记录'}
          </button>
        </form>
      </div>
    </div>
  );
}
