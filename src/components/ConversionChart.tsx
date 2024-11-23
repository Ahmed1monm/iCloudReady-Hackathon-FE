import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ConversionChartProps {
  impressions: number;
  clicks: number;
  leads: number;
  conversions: number;
}

const ConversionChart: React.FC<ConversionChartProps> = ({ impressions, clicks, leads, conversions }) => {
  const data = [
    { name: 'Impressions', value: impressions },
    { name: 'Clicks', value: clicks },
    { name: 'Leads', value: leads },
    { name: 'Conversions', value: conversions },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Conversion Funnel</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#93c5fd" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ConversionChart;