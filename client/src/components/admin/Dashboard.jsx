
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { BarChart, Activity, Users, Mail, FileText, Briefcase, Code, Star } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const DashboardCard = ({ title, value, icon: Icon, change, changeType }) => (
  <Card className="relative overflow-hidden bg-white dark:bg-gray-800">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</CardTitle>
      <Icon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
        {change && (
          <p className={`text-sm ${changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {changeType === 'increase' ? '↑' : '↓'} {change}% from last month
          </p>
        )}
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
    views: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [projectsRes, skillsRes, messagesRes] = await Promise.all([
        api.get('/projects'),
        api.get('/skills'),
        api.get('/contact/messages')
      ]);

      const projectCount = projectsRes.data.length;
      const skillCount = skillsRes.data.length;
      const messageCount = messagesRes.data.length;
      const unreadMessages = messagesRes.data.filter(msg => !msg.isRead).length;

      setStats({
        projects: projectCount,
        skills: skillCount,
        totalMessages: messageCount,
        unreadMessages
      });

      // Combine recent activities from different sources
      const activities = [
        ...projectsRes.data.slice(0, 3).map(project => ({
          type: 'project',
          title: `Project Added: ${project.title}`,
          time: new Date(project.createdAt).toLocaleDateString()
        })),
        ...messagesRes.data.slice(0, 3).map(message => ({
          type: 'message',
          title: `New Message from ${message.name}`,
          time: new Date(message.timestamp).toLocaleDateString()
        }))
      ];

      setRecentActivity(activities.sort((a, b) => new Date(b.time) - new Date(a.time)));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const dashboardStats = [
    {
      title: "Total Projects",
      value: stats.projects.toString(),
      icon: Briefcase,
      change: "8",
      changeType: "increase"
    },
    {
      title: "Active Skills",
      value: stats.skills.toString(),
      icon: Code,
      change: "12",
      changeType: "increase"
    },
    {
      title: "Total Messages",
      value: stats.totalMessages?.toString() || "0",
      icon: Mail,
      change: stats.unreadMessages > 0 ? stats.unreadMessages.toString() : undefined,
      changeType: "increase"
    },
    {
      title: "Portfolio Views",
      value: "1,429",
      icon: Users,
      change: "4",
      changeType: "decrease"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's what's happening with your portfolio
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    {activity.type === 'project' ? (
                      <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-white">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-200">Featured Projects</span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                  {stats.projects} Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-200">Skill Categories</span>
                <span className="text-gray-600 dark:text-gray-300">
                  {Math.ceil(stats.skills / 4)} Categories
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-200">Unread Messages</span>
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 rounded-full text-sm">
                  {stats.unreadMessages} New
                </span>
              </div>
              <div className="mt-6">
                <Link
                  to="/admin/dashboard/messages"
                  className="block w-full text-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  View All Messages
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
