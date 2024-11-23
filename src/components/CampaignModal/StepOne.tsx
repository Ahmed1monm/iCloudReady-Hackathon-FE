import React, { useState } from "react";
import { Campaign } from "../../types/campaign";
import { PlusCircle, XCircle } from "lucide-react";

interface StepOneProps {
  formData: Partial<Campaign>;
  updateFormData: (data: Partial<Campaign>) => void;
  onNext: () => void;
}

interface TargetAudience {
  name: string;
  description: string;
  ageRange: string;
  address: string;
  job: string;
}

const StepOne: React.FC<StepOneProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const platforms = [
    "Facebook Ads",
    "Google Ads",
    "Twitter",
    "LinkedIn",
    "TikTok",
  ];
  const [newAudience, setNewAudience] = useState<TargetAudience>({
    name: "",
    description: "",
    ageRange: "",
    address: "",
    job: "",
  });

  const handlePlatformChange = (platform: string) => {
    const currentChannels = formData.channels || [];
    const platformExists = currentChannels.some(
      (channel) => channel.name === platform
    );

    if (platformExists) {
      updateFormData({
        channels: currentChannels.filter(
          (channel) => channel.name !== platform
        ),
      });
    } else {
      updateFormData({
        channels: [...currentChannels, { name: platform, account: [] }],
      });
    }
  };

  const handleAddAudience = () => {
    if (
      newAudience.name &&
      newAudience.description &&
      newAudience.ageRange &&
      newAudience.address &&
      newAudience.job
    ) {
      const currentAudiences = formData.targetAudience || [];
      updateFormData({
        targetAudience: [...currentAudiences, newAudience],
      });
      setNewAudience({
        name: "",
        description: "",
        ageRange: "",
        address: "",
        job: "",
      });
    }
  };

  const handleRemoveAudience = (index: number) => {
    const currentAudiences = formData.targetAudience || [];
    updateFormData({
      targetAudience: currentAudiences.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Campaign Name
        </label>
        <input
          type="text"
          required
          value={formData.name || ""}
          onChange={(e) => updateFormData({ name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="datetime-local"
            required
            value={formData.startDate || ""}
            onChange={(e) => updateFormData({ startDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="datetime-local"
            required
            value={formData.endDate || ""}
            onChange={(e) => updateFormData({ endDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Budget
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            required
            min="0"
            value={formData.budget || ""}
            onChange={(e) => updateFormData({ budget: Number(e.target.value) })}
            className="block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Platforms
        </label>
        <div className="space-y-2">
          {platforms.map((platform) => (
            <label key={platform} className="flex items-center">
              <input
                type="checkbox"
                checked={
                  formData.channels?.some(
                    (channel) => channel.name === platform
                  ) || false
                }
                onChange={() => handlePlatformChange(platform)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">{platform}</span>
            </label>
          ))}
        </div>
      </div>

      {/* New Target Audience Section */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Target Audience
        </label>

        {/* Existing Audiences */}
        <div className="space-y-3">
          {formData.targetAudience?.map((audience, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg relative">
              <button
                type="button"
                onClick={() => handleRemoveAudience(index)}
                className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
              >
                <XCircle className="h-5 w-5" />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">{audience.name}</p>
                  <p className="text-sm text-gray-500">
                    {audience.description}
                  </p>
                </div>
                <div className="text-sm">
                  <p>
                    <span className="font-medium">Age Range:</span>{" "}
                    {audience.ageRange}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {audience.address}
                  </p>
                  <p>
                    <span className="font-medium">Job:</span> {audience.job}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Audience Form */}
        <div className="border rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Audience Name
              </label>
              <input
                type="text"
                value={newAudience.name}
                onChange={(e) =>
                  setNewAudience({ ...newAudience, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age Range
              </label>
              <input
                type="text"
                value={newAudience.ageRange}
                onChange={(e) =>
                  setNewAudience({ ...newAudience, ageRange: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              value={newAudience.description}
              onChange={(e) =>
                setNewAudience({ ...newAudience, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={newAudience.address}
                onChange={(e) =>
                  setNewAudience({ ...newAudience, address: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job
              </label>
              <input
                type="text"
                value={newAudience.job}
                onChange={(e) =>
                  setNewAudience({ ...newAudience, job: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddAudience}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Audience
          </button>
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
