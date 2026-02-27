import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, ListTodo, Calendar, BarChart2, 
  Users, Settings, HelpCircle, LogOut, Search, 
  Bell, Mail, Menu, X 
} from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, label, badge, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => `
      flex items-center justify-between px-8 py-3 transition-all duration-200 group
      ${isActive 
        ? 'text-emerald-900 border-l-[3px] border-emerald-900 bg-emerald-50/50' 
        : 'text-gray-400 hover:text-emerald-700 hover:bg-gray-50'}
    `}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} className="transition-colors group-hover:text-emerald-700" />
      <span className="font-medium text-[15px]">{label}</span>
    </div>
    {badge && (
      <span className="bg-emerald-900 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
        {badge}
      </span>
    )}
  </NavLink>
);

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] font-sans text-slate-900">
      
      {/* --- MOBILE OVERLAY --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
        /* Mobile: Fixed overlay */
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out
        /* Desktop: Sticky behavior */
        lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo Section */}
        <div className="p-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-900 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
               <div className="w-4 h-4 border-2 border-white rounded-full"></div>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-emerald-950">Donezo</h1>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-500">
            <X size={24} />
          </button>
        </div>

        {/* Navigation - scrollable if content overflows */}
        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <div className="px-8 mb-4 text-[11px] font-bold text-gray-400 uppercase tracking-[2px]">Menu</div>
          <SidebarLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" onClick={() => setIsSidebarOpen(false)} />
          <SidebarLink to="/dashboard/products" icon={ListTodo} label="Products" badge="12+" onClick={() => setIsSidebarOpen(false)} />
          <SidebarLink to="/dashboard/calendar" icon={Calendar} label="Calendar" onClick={() => setIsSidebarOpen(false)} />
          <SidebarLink to="/dashboard/analytics" icon={BarChart2} label="Analytics" onClick={() => setIsSidebarOpen(false)} />
          <SidebarLink to="/dashboard/users" icon={Users} label="Users" onClick={() => setIsSidebarOpen(false)} />

          <div className="px-8 mt-10 mb-4 text-[11px] font-bold text-gray-400 uppercase tracking-[2px]">General</div>
          <SidebarLink to="/dashboard/settings" icon={Settings} label="Settings" onClick={() => setIsSidebarOpen(false)} />
          <SidebarLink to="/dashboard/help" icon={HelpCircle} label="Help" onClick={() => setIsSidebarOpen(false)} />
          
          <button className="w-full flex items-center gap-3 px-8 py-3 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors mt-4">
            <LogOut size={20} />
            <span className="font-medium text-[15px]">Logout</span>
          </button>
        </nav>

        {/* Promo Card - Fixed at bottom of sidebar */}
        <div className="p-6 shrink-0 hidden sm:block">
          <div className="p-5 bg-emerald-950 rounded-[2rem] text-white relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] opacity-70 mb-0.5">Download our</p>
              <p className="text-base font-bold mb-4">Mobile App</p>
              <button className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs py-2.5 px-4 rounded-xl w-full font-semibold transition-all">
                Download
              </button>
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-emerald-800 rounded-full opacity-40 blur-xl"></div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Navbar - also sticky */}
        <header className="h-20 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-10 border-b border-gray-50 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={toggleSidebar} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>

            <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search task" 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="flex items-center gap-2 md:gap-4 text-gray-400">
              <Mail size={20} className="cursor-pointer hover:text-emerald-900" />
              <div className="relative cursor-pointer hover:text-emerald-900">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 pl-4 md:pl-6 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">Totok Michael</p>
                <p className="text-[11px] text-gray-400">tmichael20@mail.com</p>
              </div>
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" 
                alt="Profile" 
                className="w-10 h-10 rounded-2xl bg-emerald-100"
              />
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="p-4 md:p-10 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;