import React from 'react';
import { AlertTriangle, Bot, Smartphone } from 'lucide-react';

interface ErrorPageProps {
  type: 'NOT_TELEGRAM' | 'AUTH_ERROR';
}

const ErrorPage: React.FC<ErrorPageProps> = ({ type }) => {
  if (type === 'NOT_TELEGRAM') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Smartphone size={40} className="text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Извините!</h1>
        <p className="text-gray-600 mb-6">
          Это приложение доступно только через Telegram Mini App. Пожалуйста, откройте его в мобильном приложении Telegram.
        </p>
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 w-full max-w-sm">
          <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Как запустить?</p>
          <ol className="text-sm text-left text-gray-700 space-y-2">
            <li>1. Откройте приложение Telegram</li>
            <li>2. Найдите нашего бота <strong>@LDPR_Bot</strong></li>
            <li>3. Нажмите кнопку "Запустить Mini App"</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-red-50 text-center">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle size={40} className="text-red-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Ошибка авторизации</h1>
      <p className="text-gray-600 mb-6">
        Нам не удалось подтвердить ваши данные для входа.
      </p>
      <div className="p-6 bg-white rounded-xl shadow-md border border-red-100 w-full max-w-sm">
        <Bot size={32} className="mx-auto mb-3 text-ldprBlue" />
        <p className="text-sm font-semibold text-gray-800 mb-2">Пожалуйста, пройдите анкетирование</p>
        <p className="text-sm text-gray-600 mb-4">
          Чтобы пользоваться приложением, вам необходимо сначала пройти опрос в нашем чат-боте.
        </p>
        {/* Fix: Cast window to any to access Telegram WebApp.close() without TS errors */}
        <button 
          onClick={() => (window as any).Telegram?.WebApp?.close()}
          className="w-full bg-ldprBlue text-white py-3 rounded-lg font-bold shadow-lg"
        >
          Вернуться к боту
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;