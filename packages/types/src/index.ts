export type Organization = {
  id: string;
  name: string;
  slug: string;
};

export type InspectionStatus = 'draft' | 'in_progress' | 'completed' | 'archived';

export type Inspection = {
  id: string;
  organizationId: string;
  title: string;
  status: InspectionStatus;
  createdAt: string;
  updatedAt: string;
};
