import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface LeadsDistributionProps {
  connectedLeads: number;
  unconnectedLeads: number;
}

const LeadsDistribution: React.FC<LeadsDistributionProps> = ({ connectedLeads, unconnectedLeads }) => {
  const data = [
    { name: 'Connected Leads', value: connectedLeads },
    { name: 'Unconnected Leads', value: unconnectedLeads },
  ];

  const COLORS = ['#3b82f6', '#93c5fd'];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Leads Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LeadsDistribution;