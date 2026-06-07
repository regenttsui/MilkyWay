import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ConfirmDialogContextType {
  showConfirm: (title: string, message: string, onConfirm: () => void) => void;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined);

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<{
    visible: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    visible: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    setDialog({
      visible: true,
      title,
      message,
      onConfirm,
    });
  };

  const handleCancel = () => {
    setDialog(prev => ({ ...prev, visible: false }));
  };

  const handleConfirm = () => {
    dialog.onConfirm();
    setDialog(prev => ({ ...prev, visible: false }));
  };

  return (
    <>
      <ConfirmDialogContext.Provider value={{ showConfirm }}>
        {children}
      </ConfirmDialogContext.Provider>
      {dialog.visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={handleCancel}
          />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {dialog.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {dialog.message}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 py-2 px-4 rounded-lg border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmDialogContext);
  if (context === undefined) {
    throw new Error('useConfirm must be used within a ConfirmDialogProvider');
  }
  return context;
}
