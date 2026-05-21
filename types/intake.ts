export type ContactInquiry = {
  inquiryId: string;
  source: string;
  name: string;
  email: string;
  phone:string;
  company?: string;
  projectType: string;
  goal: string;
  blocker?: string;
  budget?: string;
  timeline?: string;
  preferredContact?: string;
  message?: string;
  submittedAt: string;
};