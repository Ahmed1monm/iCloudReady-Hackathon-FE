import React from 'react';
import { Campaign } from '../../types/campaign';

interface StepTwoProps {
  formData: Partial<Campaign>;
  updateFormData: (data: Partial<Campaign>) => void;
  additionalInputs: {[key: string]: string[]};
  onBack: () => void;
  onSubmit: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({
  formData,
  updateFormData,
  additionalInputs,
  onBack,
  onSubmit
}) => {
  const [platformData, setPlatformData] = React.useState<{[key: string]: {[key: string]: string}}>({});

  const handleInputChange = (platform: string, field: string, value: string) => {
    setPlatformData(prev => ({
      ...prev,
      [platform]: {
        ...(prev[platform] || {}),
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can process platformData before submitting
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {Object.entries(additionalInputs).map(([platform, fields]) => (
        <div key={platform} className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 capitalize">{platform}</h3>
          <div className="space-y-2">
            {fields.map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace(/_/g, ' ')}
                </label>
                <input
                  type="text"
                  value={platformData[platform]?.[field] || ''}
                  onChange={(e) => handleInputChange(platform, field, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Campaign
        </button>
      </div>
    </form>
  );
};

export default StepTwo;