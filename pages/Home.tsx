
import React from 'react';
import { Newspaper, Trophy, Calendar, MapPin } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="bg-ldprBlue text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl font-black mb-2 text-ldprYellow uppercase tracking-tighter">Вместе за ЛДПР!</h1>
          <p className="text-blue-100 text-sm">Добро пожаловать в официальное приложение. Будьте в курсе всех событий.</p>
        </div>
        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-ldprYellow opacity-10 rounded-full blur-2xl"></div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 bg-blue-50 text-ldprBlue rounded-full flex items-center justify-center">
            <Newspaper size={20} />
          </div>
          <span className="text-xs font-bold uppercase">Новости</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center">
            <Trophy size={20} />
          </div>
          <span className="text-xs font-bold uppercase">Рейтинг</span>
        </div>
      </div>

      <section>
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar size={18} className="text-ldprBlue" />
          Ближайшие события
        </h3>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                <span className="text-xs font-bold">1{i}</span>
                <span className="text-[10px] text-gray-500 uppercase">Окт</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Встреча с активистами региона</h4>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                  <MapPin size={12} />
                  <span>Центральный штаб</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ldprYellow/10 p-6 rounded-xl border border-ldprYellow/20">
        <h3 className="font-bold text-ldprBlue mb-2">Присоединяйтесь к нам!</h3>
        <p className="text-xs text-gray-600 mb-4">Станьте частью большой команды ЛДПР и меняйте страну к лучшему вместе с нами.</p>
        <button className="w-full bg-ldprBlue text-white py-3 rounded-lg font-bold text-sm shadow-md hover:bg-blue-800 transition-colors">
          Стать участником
        </button>
      </section>
    </div>
  );
};

export default Home;
