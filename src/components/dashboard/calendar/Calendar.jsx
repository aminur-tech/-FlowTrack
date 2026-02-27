import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval 
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock } from 'lucide-react';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock Events
  const events = [
    { date: new Date(), title: 'Product Sync', time: '10:00 AM', type: 'work' },
    { date: addDays(new Date(), 2), title: 'Design Review', time: '02:30 PM', type: 'design' },
  ];

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl">
          <CalendarIcon size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Schedule and track your tasks</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <button 
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-gray-600 dark:text-gray-400"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => setCurrentMonth(new Date())}
          className="px-4 py-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
        >
          Today
        </button>
        <button 
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-gray-600 dark:text-gray-400"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="grid grid-cols-7 gap-px bg-gray-100 dark:bg-slate-800 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        {calendarDays.map((day, idx) => {
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const dayEvents = events.filter(e => isSameDay(e.date, day));

          return (
            <div
              key={idx}
              onClick={() => setSelectedDate(day)}
              className={`min-h-[120px] p-3 bg-white dark:bg-slate-900 transition-all cursor-pointer group hover:bg-gray-50 dark:hover:bg-slate-800/50 ${
                !isCurrentMonth ? 'text-gray-300 dark:text-gray-700' : 'text-gray-900 dark:text-white'
              }`}
            >
              <div className="flex flex-col h-full">
                <span className={`text-sm font-bold w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                  isSelected ? 'bg-emerald-900 text-white' : 'group-hover:text-emerald-600'
                }`}>
                  {format(day, 'd')}
                </span>
                
                <div className="mt-2 space-y-1">
                  {dayEvents.map((event, i) => (
                    <div key={i} className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 border-l-2 border-emerald-500 rounded text-[10px] font-bold text-emerald-700 dark:text-emerald-400 truncate">
                      {event.title}
                    </div>
                  ))}
                </div>
                
                <button className="mt-auto self-end opacity-0 group-hover:opacity-100 p-1 bg-gray-100 dark:bg-slate-800 rounded-lg text-gray-500 transition-all">
                  <Plus size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="animate-in fade-in duration-700">
      {renderHeader()}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Calendar Grid */}
        <div className="lg:col-span-3">
          {renderDays()}
          {renderCells()}
        </div>

        {/* Sidebar: Upcoming Events */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming</h3>
            <div className="space-y-4">
              {events.map((event, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="text-center min-w-[45px]">
                    <p className="text-xs font-bold text-gray-400 uppercase">{format(event.date, 'MMM')}</p>
                    <p className="text-lg font-black text-emerald-900 dark:text-emerald-400">{format(event.date, 'dd')}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{event.title}</p>
                    <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
                      <Clock size={12} />
                      {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-emerald-900 text-white rounded-2xl font-bold text-sm hover:bg-emerald-950 transition-all shadow-lg shadow-emerald-900/10">
              Create New Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;