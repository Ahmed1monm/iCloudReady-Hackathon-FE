import React, { useState } from 'react';
import axios from 'axios';
import { Campaign } from '../../types/campaign';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

interface CampaignFormProps {
  onClose: () => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Campaign>>({
    name: '',
    startDate: '',
    endDate: '',
    budget: 0,
    channels: [],
    targetAudience: []
  });
  const [additionalInputs, setAdditionalInputs] = useState<{[key: string]: string[]}>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/v1/additional-inputs');
      setAdditionalInputs(response.data.additional_input);
      setStep(2);
    } catch (err) {
      setError('Failed to fetch additional inputs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post('http://localhost:8000/api/v1/campaign', formData);
      onClose();
    } catch (err) {
      setError('Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (data: Partial<Campaign>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        {error}
        <button
          onClick={() => setError(null)}
          className="mt-2 text-blue-500 hover:underline block w-full"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {step === 1 ? (
        <StepOne
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
        />
      ) : (
        <StepTwo
          formData={formData}
          updateFormData={updateFormData}
          additionalInputs={additionalInputs}
          onBack={() => setStep(1)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CampaignForm;