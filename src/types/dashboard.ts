export interface CampaignAnalytics {
  campaigns: number;
  leads: number;
  clicks: number;
  impressions: number;
  conversions: number;
}

export interface LeadsAnalytics {
  leads: number;
  clicks: number;
  impressions: number;
  conversions: number;
  potentialRevenue: number;
  connectedLeads: number;
  unconnectedLeads: number;
  connectedLeadsRevenue: number;
}

export interface DashboardData {
  campaignAnalytics: CampaignAnalytics;
  leadsAnalytics: LeadsAnalytics;
}