
import React, { useState, useEffect, useCallback } from 'react';
import { Menu } from 'lucide-react';
import { AppState, View, MeResponse } from './types';
import { STORAGE_KEY } from './constants';
import { login, getMe } from './api/auth';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOADING);
  const [currentView, setCurrentView] = useState<View>('HOME');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<MeResponse | null>(null);

  const initAuth = useCallback(async () => {
    // 1. Check if running inside Telegram
    const tg = (window as any).Telegram?.WebApp;
    
    if (!tg || !tg.initData) {
      // Small delay to prevent flash in dev if needed, but per requirements:
      setAppState(AppState.NOT_TELEGRAM);
      return;
    }

    tg.ready();
    tg.expand();

    try {
      // 2. Try to login
      const { token } = await login({ initData: tg.initData });
      localStorage.setItem(STORAGE_KEY, token);

      // 3. Fetch user info
      const me = await getMe(token);
      setUserData(me);
      setAppState(AppState.AUTH_SUCCESS);
    } catch (error) {
      console.error('Auth failure:', error);
      setAppState(AppState.AUTH_ERROR);
    }
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  if (appState === AppState.LOADING) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ldprBlue text-white">
        <div className="w-16 h-16 border-4 border-ldprYellow border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-xl font-black uppercase tracking-widest animate-pulse">ЛДПР</div>
        <div className="mt-4 text-xs text-blue-200">Загрузка данных...</div>
      </div>
    );
  }

  if (appState === AppState.NOT_TELEGRAM) {
    return <ErrorPage type="NOT_TELEGRAM" />;
  }

  if (appState === AppState.AUTH_ERROR) {
    return <ErrorPage type="AUTH_ERROR" />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'HOME':
        return <Home />;
      case 'PROFILE':
        return (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4">Личный кабинет</h2>
            {userData ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-4">
                  <div className="w-16 h-16 bg-ldprBlue rounded-full flex items-center justify-center text-ldprYellow text-2xl font-bold uppercase">
                    {userData.name[0]}{userData.surname[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{userData.surname} {userData.name}</div>
                    <div className="text-sm text-gray-500">ID: {userData.id}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Регион:</span><span className="font-medium">{userData.region}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Город:</span><span className="font-medium">{userData.city}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Телефон:</span><span className="font-medium">{userData.phone_number}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Email:</span><span className="font-medium">{userData.email}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Участник партии:</span><span className={`font-bold ${userData.is_member ? 'text-green-600' : 'text-gray-400'}`}>{userData.is_member ? 'Да' : 'Нет'}</span></div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">Данные не загружены</div>
            )}
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Menu size={32} />
            </div>
            <h2 className="text-xl font-bold">Раздел в разработке</h2>
            <p className="text-sm text-gray-500 mt-2">Совсем скоро здесь появится новый функционал.</p>
            <button 
              onClick={() => setCurrentView('HOME')}
              className="mt-6 px-6 py-2 bg-ldprBlue text-white rounded-lg text-sm"
            >
              На главную
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header Bar */}
      <div className="sticky top-0 z-30 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-gray-50 rounded-lg text-ldprBlue transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-ldprBlue rounded flex items-center justify-center">
            <span className="text-ldprYellow font-bold text-[10px]">ЛДПР</span>
          </div>
          <span className="font-black text-ldprBlue text-sm tracking-tighter uppercase">Приложение</span>
        </div>
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
          {userData ? (
            <span className="text-ldprBlue font-bold text-xs">{userData.name[0]}</span>
          ) : (
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
          )}
        </div>
      </div>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      <main className="p-4 max-w-md mx-auto">
        {renderContent()}
      </main>

      {/* Bottom Padding for safety on some devices */}
      <div className="h-4" />
    </div>
  );
};

export default App;
