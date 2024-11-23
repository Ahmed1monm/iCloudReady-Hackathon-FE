export interface Token {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
}

export interface Account {
  token: Token;
  name: string;
  id: string;
  isDefault: boolean;
}

export interface Channel {
  name: string;
  account: Account[];
}

export interface TargetAudience {
  name: string;
  description: string;
  ageRange: string;
  address: string;
  job: string;
}

export interface Campaign {
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  channels: Channel[];
  targetAudience: TargetAudience[];
}

export interface AdditionalInputs {
  message: string;
  additional_input: {
    [key: string]: string[];
  };
}