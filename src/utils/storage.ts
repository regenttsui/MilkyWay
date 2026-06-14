import type { Record } from '../types';

const STORAGE_KEY = 'milkyway_records';

export function getRecords(): Record[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveRecords(records: Record[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function addRecord(record: Record): Record[] {
  const records = getRecords();
  const newRecords = [record, ...records];
  saveRecords(newRecords);
  return newRecords;
}

export function deleteRecord(id: string): Record[] {
  const records = getRecords();
  const newRecords = records.filter(r => r.id !== id);
  saveRecords(newRecords);
  return newRecords;
}

export function updateRecord(id: string, updatedRecord: Omit<Record, 'id'>): Record[] {
  const records = getRecords();
  const newRecords = records.map(r => r.id === id ? { ...r, ...updatedRecord } : r);
  saveRecords(newRecords);
  return newRecords;
}

export function exportData(): string {
  const records = getRecords();
  return JSON.stringify(records, null, 2);
}

export function importData(data: string): boolean {
  try {
    const records = JSON.parse(data);
    if (Array.isArray(records)) {
      saveRecords(records);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// 检查并清理重复记录（基于id）
export function cleanDuplicateRecords(): { cleaned: number; remaining: number } {
  const records = getRecords();
  const uniqueRecords = records.filter((record, index, self) => 
    index === self.findIndex(r => r.id === record.id)
  );
  
  const cleanedCount = records.length - uniqueRecords.length;
  
  if (cleanedCount > 0) {
    saveRecords(uniqueRecords);
  }
  
  return {
    cleaned: cleanedCount,
    remaining: uniqueRecords.length
  };
}
