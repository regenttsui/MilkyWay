import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Record } from '../types';
import { getRecords, addRecord, deleteRecord as deleteRecordFromStorage } from '../utils/storage';

interface RecordState {
  records: Record[];
}

// 使用联合类型定义具体的Action类型，提供严格的类型检查
type LoadRecordsAction = {
  type: 'LOAD_RECORDS';
  payload: Record[];
};

type AddRecordAction = {
  type: 'ADD_RECORD';
  payload: Record;
};

type DeleteRecordAction = {
  type: 'DELETE_RECORD';
  payload: string;
};

type RecordAction = LoadRecordsAction | AddRecordAction | DeleteRecordAction;

const initialState: RecordState = {
  records: [],
};

function recordReducer(state: RecordState, action: RecordAction): RecordState {
  switch (action.type) {
    case 'LOAD_RECORDS':
      return { ...state, records: action.payload };
    case 'ADD_RECORD':
      return { ...state, records: [action.payload, ...state.records] };
    case 'DELETE_RECORD':
      return { ...state, records: state.records.filter(r => r.id !== action.payload) };
    default:
      return state;
  }
}

interface RecordContextType {
  records: Record[];
  addRecord: (record: Record) => void;
  deleteRecord: (id: string) => void;
  loadRecords: () => void;
}

const RecordContext = createContext<RecordContextType | undefined>(undefined);

export function RecordProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(recordReducer, initialState);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    const records = getRecords();
    dispatch({ type: 'LOAD_RECORDS', payload: records });
  };

  const handleAddRecord = (record: Record) => {
    addRecord(record);
    dispatch({ type: 'ADD_RECORD', payload: record });
  };

  const handleDeleteRecord = (id: string) => {
    deleteRecordFromStorage(id);
    dispatch({ type: 'DELETE_RECORD', payload: id });
  };

  return (
    <RecordContext.Provider
      value={{
        records: state.records,
        addRecord: handleAddRecord,
        deleteRecord: handleDeleteRecord,
        loadRecords,
      }}
    >
      {children}
    </RecordContext.Provider>
  );
}

export function useRecords() {
  const context = useContext(RecordContext);
  if (context === undefined) {
    throw new Error('useRecords must be used within a RecordProvider');
  }
  return context;
}
