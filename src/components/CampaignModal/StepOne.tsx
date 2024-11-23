import React from 'react';
import { Campaign } from '../../types/campaign';

interface StepOneProps {
  formData: Partial<Campaign>;
  updateFormData: (data: Partial<Campaign>) => void;
  onNext: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ formData, updateFormData, onNext }) => {
  const platforms = ['Facebook Ads', 'Google Ads', 'Twitter', 'LinkedIn', 'TikTok'];

  const handlePlatformChange = (platform: string) => {
    const currentChannels = formData.channels || [];
    const platformExists = currentChannels.some(channel => channel.name === platform);

    if (platformExists) {
      updateFormData({
        channels: currentChannels.filter(channel => channel.name !== platform)
      });
    } else {
      updateFormData({
        channels: [...currentChannels, { name: platform, account: [] }]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
        <input
          type="text"
          required
          value={formData.name || ''}
          onChange={(e) => updateFormData({ name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="datetime-local"
            required
            value={formData.startDate || ''}
            onChange={(e) => updateFormData({ startDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="datetime-local"
            required
            value={formData.endDate || ''}
            onChange={(e) => updateFormData({ endDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Budget</label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            required
            min="0"
            value={formData.budget || ''}
            onChange={(e) => updateFormData({ budget: Number(e.target.value) })}
            className="block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Platforms</label>
        <div className="space-y-2">
          {platforms.map((platform) => (
            <label key={platform} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.channels?.some(channel => channel.name === platform) || false}
                onChange={() => handlePlatformChange(platform)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">{platform}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default StepOne;