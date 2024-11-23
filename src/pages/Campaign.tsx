import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Facebook, 
  Globe, 
  Clock, 
  MapPin, 
  Briefcase, 
  ChevronLeft 
} from 'lucide-react';
import Leads from "../components/Leads/Leads";

export default function CampaignDetail() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/campaign/${id}`
        );
        setCampaign(response.data);
      } catch (err) {
        setError("Failed to fetch campaign details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      return (
        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">
          Upcoming
        </span>
      );
    } else if (now > end) {
      return (
        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-800">
          Ended
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Campaigns
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
              <div className="mt-2">
                {getStatusBadge(campaign.startDate, campaign.endDate)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Duration</p>
                <p className="text-sm">{formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Budget</p>
                <p className="text-sm">${campaign.budget.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm">{formatDate(campaign.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Advertising Channels</h2>
            <div className="space-y-4">
              {campaign.channels.map((channel) => (
                <div 
                  key={channel._id} 
                  className="p-4 border rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {channel.name === "Facebook Ads" ? (
                        <Facebook className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Globe className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-medium">{channel.name}</span>
                    </div>
                  </div>
                  {channel.account.map((acc) => (
                    <div key={acc._id} className="ml-7 text-sm text-gray-600">
                      <p className="font-medium">{acc.name}</p>
                      <p className="text-xs text-gray-500">ID: {acc.id}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Target Audience</h2>
            <div className="space-y-4">
              {campaign.targetAudience.map((audience) => (
                <div 
                  key={audience._id} 
                  className="p-4 border rounded-lg hover:border-blue-500 transition-colors"
                >
                  <h3 className="font-medium mb-2">{audience.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{audience.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Age: {audience.ageRange}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{audience.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase className="h-4 w-4" />
                      <span className="text-sm">{audience.job}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Leads id={id} />
      </div>
    </div>
  );
}