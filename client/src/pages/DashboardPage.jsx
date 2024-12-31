import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Dashboard from '@/components/admin/Dashboard';
import ProjectManager from '@/components/admin/ProjectManager';
import SkillsManager from '@/components/admin/SkillsManager';
import MessageCenter from '@/components/admin/MessageCenter';
import ExperienceManager from '@/components/admin/ExperienceManager';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'projects', name: 'Projects', icon: '💼' },
    { id: 'skills', name: 'Skills', icon: '🎯' },
    { id: 'experience', name: 'Experience', icon: '🎓' },
    { id: 'messages', name: 'Messages', icon: '📧' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      {/* Sidebar Backdrop */}
{isMenuOpen && (
  <div 
    className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
    onClick={() => setIsMenuOpen(false)} 
  ></div>
)}

<aside 
  className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform ${
    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
  } md:translate-x-0 transition-transform duration-300 ease-in-out`}>
  <div className="h-full flex flex-col">
    {/* Logo */}
    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Admin Panel
      </h1>
    </div>

    {/* Navigation */}
    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
            activeTab === tab.id
              ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <span className="text-xl mr-3">{tab.icon}</span>
          {tab.name}
        </button>
      ))}
    </nav>

    {/* User Menu */}
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            {user?.email?.[0]?.toUpperCase()}
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {user?.email}
          </p>
          <button
            onClick={logout}
            className="text-xs text-red-600 dark:text-red-400 hover:text-red-500"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  </div>
</aside>


      {/* Main Content */}
      <div className="md:pl-64">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>

        {/* Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && <Dashboard />}
            {activeTab === 'projects' && <ProjectManager />}
            {activeTab === 'skills' && <SkillsManager />}
            {activeTab === 'experience' && <ExperienceManager />}
            {activeTab === 'messages' && <MessageCenter />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;