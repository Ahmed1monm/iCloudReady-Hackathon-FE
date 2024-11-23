import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DashboardData } from '../types/dashboard';
import StatCard from '../components/StatCard';
import ConversionChart from '../components/ConversionChart';
import LeadsDistribution from '../components/LeadsDistribution';
import Modal from '../components/Modal/Modal';
import CampaignForm from '../components/CampaignModal/CampaignForm';
import { 
  BarChart3, 
  Users, 
  MousePointerClick, 
  Eye, 
  Target,
  DollarSign,
  UserCheck,
  Percent,
  Plus
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/dashboard');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error || 'Something went wrong'}</div>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Campaign
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Campaigns"
            value={data.campaignAnalytics.campaigns}
            icon={BarChart3}
          />
          <StatCard
            title="Total Leads"
            value={formatNumber(data.campaignAnalytics.leads)}
            icon={Users}
          />
          <StatCard
            title="Total Clicks"
            value={formatNumber(data.campaignAnalytics.clicks)}
            icon={MousePointerClick}
          />
          <StatCard
            title="Total Impressions"
            value={formatNumber(data.campaignAnalytics.impressions)}
            icon={Eye}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Conversion Rate"
            value={`${((data.leadsAnalytics.conversions / data.leadsAnalytics.leads) * 100).toFixed(1)}%`}
            icon={Target}
          />
          <StatCard
            title="Potential Revenue"
            value={formatCurrency(data.leadsAnalytics.potentialRevenue)}
            icon={DollarSign}
          />
          <StatCard
            title="Connected Leads"
            value={data.leadsAnalytics.connectedLeads}
            icon={UserCheck}
          />
          <StatCard
            title="Connection Rate"
            value={`${((data.leadsAnalytics.connectedLeads / data.leadsAnalytics.leads) * 100).toFixed(1)}%`}
            icon={Percent}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConversionChart
            impressions={data.leadsAnalytics.impressions}
            clicks={data.leadsAnalytics.clicks}
            leads={data.leadsAnalytics.leads}
            conversions={data.leadsAnalytics.conversions}
          />
          <LeadsDistribution
            connectedLeads={data.leadsAnalytics.connectedLeads}
            unconnectedLeads={data.leadsAnalytics.unconnectedLeads}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Campaign"
      >
        <CampaignForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Dashboard;