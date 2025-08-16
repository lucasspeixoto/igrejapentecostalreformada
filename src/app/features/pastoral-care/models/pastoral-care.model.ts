export interface PastoralCareType {
  id: number;
  created_at: string;
  name: string;
  description: string;
}

export interface PastoralCare {
  id?: string;
  created_at: string;
  type_id: number;
  date: string;
  member_id: number;
  pastor: string;
  description: string | null;
  members?: { name: string };
  pastoral_care_types?: { name: string };
}
