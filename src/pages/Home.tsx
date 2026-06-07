import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useRecords } from '../context/RecordContext';
import { useConfirm } from '../context/ConfirmDialogContext';
import type { Record } from '../types';
import { FEEDING_TYPES } from '../types';

const RecordCard = ({ record }: { record: Record }) => {
  const navigate = useNavigate();
  const { deleteRecord } = useRecords();
  const { showConfirm } = useConfirm();
  
  const isFeeding = record.type === 'feeding';
  const time = dayjs(record.timestamp).format('MM-DD HH:mm');
  
  const handleEdit = () => {
    if (isFeeding) {
      navigate(`/edit-feeding/${record.id}`);
    } else {
      navigate(`/edit-poop/${record.id}`);
    }
  };

  const handleDelete = () => {
    showConfirm(
      '确认删除',
      `确定要删除这条${isFeeding ? '喝奶' : '大便'}记录吗？`,
      () => deleteRecord(record.id)
    );
  };

  let content;
  if (isFeeding) {
    const feedingData = record.data as any;
    const feedingType = FEEDING_TYPES.find(t => t.value === feedingData.type);
    content = (
      <div>
        <div className="font-medium text-pink-500 dark:text-pink-400">🍼 {feedingType?.label || '喝奶'}</div>
        {feedingData.amount && (
          <div className="text-sm text-gray-600 dark:text-gray-400">{feedingData.amount} 毫升</div>
        )}
      </div>
    );
  } else {
    const poopData = record.data as any;
    content = (
      <div>
        <div className="font-medium text-yellow-600 dark:text-yellow-400">💩 大便</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{poopData.shape} · {poopData.color}</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 mb-3 transition-colors duration-300">
      <div className="flex justify-between items-start mb-3">
        {content}
        <div className="text-xs text-gray-400 dark:text-gray-500">{time}</div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="flex-1 py-2 px-3 text-sm rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium"
        >
          ✏️ 编辑
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 py-2 px-3 text-sm rounded-lg bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium"
        >
          🗑️ 删除
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const { records } = useRecords();

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 pb-24 transition-colors duration-300">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-800 dark:text-yellow-200 mb-2">MilkyWay</h1>
          <p className="text-yellow-600 dark:text-yellow-400">记录宝宝的每一刻成长</p>
        </div>

        <div className="mb-6">
          <div className="flex gap-2">
            <Link
              to="/add-feeding"
              className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 dark:from-pink-500 dark:to-pink-600 text-white py-4 rounded-xl text-center font-medium shadow-md active:scale-95 transition-all duration-200"
            >
              🍼 记录喝奶
            </Link>
            <Link
              to="/add-poop"
              className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 text-white py-4 rounded-xl text-center font-medium shadow-md active:scale-95 transition-all duration-200"
            >
              💩 记录大便
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">最近记录</h2>
          {records.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
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
