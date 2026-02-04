
import React from 'react';
import { Home, User, Music, ShoppingBag, Send, Users, X } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: View;
  onNavigate: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentView, onNavigate }) => {
  const menuItems = [
    { id: 'HOME' as View, label: 'Главная страница', icon: Home },
    { id: 'PROFILE' as View, label: 'Личный кабинет', icon: User },
    { id: 'MUSIC' as View, label: 'Музыка ЛДПР', icon: Music },
    { id: 'SHOP' as View, label: 'Магазин ЛДПР', icon: ShoppingBag },
    { id: 'APPEAL' as View, label: 'Подать обращение', icon: Send },
    { id: 'JOIN' as View, label: 'Присоединиться к команде', icon: Users },
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar Panel */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-ldprBlue rounded flex items-center justify-center">
              <span className="text-ldprYellow font-bold text-xs">ЛДПР</span>
            </div>
            <h2 className="font-bold text-ldprBlue">Меню</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-ldprBlue text-white' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-ldprYellow' : 'text-ldprBlue'} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-6 bg-gray-50 text-xs text-gray-400 text-center">
          Версия 1.0.0 &copy; 2024 ЛДПР
        </div>
      </div>
    </>
  );
};

export default Sidebar;
