import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useRecords } from '../context/RecordContext';
import type { Record } from '../types';
import { FEEDING_TYPES } from '../types';

const RecordCard = ({ record }: { record: Record }) => {
  const isFeeding = record.type === 'feeding';
  const time = dayjs(record.timestamp).format('MM-DD HH:mm');
  
  let content;
  if (isFeeding) {
    const feedingData = record.data as any;
    const feedingType = FEEDING_TYPES.find(t => t.value === feedingData.type);
    content = (
      <div>
        <div className="font-medium text-pink-600">🍼 {feedingType?.label || '喝奶'}</div>
        {feedingData.amount && (
          <div className="text-sm text-gray-600">{feedingData.amount} 毫升</div>
        )}
      </div>
    );
  } else {
    const poopData = record.data as any;
    content = (
      <div>
        <div className="font-medium text-yellow-600">💩 大便</div>
        <div className="text-sm text-gray-600">{poopData.shape} · {poopData.color}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-3">
      <div className="flex justify-between items-start">
        {content}
        <div className="text-xs text-gray-400">{time}</div>
      </div>
    </div>
  );
};

export default function Home() {
  const { records } = useRecords();

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50 pb-24">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-800 mb-2">MilkyWay</h1>
          <p className="text-yellow-600">记录宝宝的每一刻成长</p>
        </div>

        <div className="mb-6">
          <div className="flex gap-3">
            <Link
              to="/add-feeding"
              className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 text-white py-4 rounded-xl text-center font-medium shadow-md active:scale-95 transition-transform"
            >
              🍼 记录喝奶
            </Link>
            <Link
              to="/add-poop"
              className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-4 rounded-xl text-center font-medium shadow-md active:scale-95 transition-transform"
            >
              💩 记录大便
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">最近记录</h2>
          {records.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-5xl mb-4">👶</div>
              <p>还没有记录，开始添加第一条吧！</p>
            </div>
          ) : (
            records.map(record => (
              <RecordCard key={record.id} record={record} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
