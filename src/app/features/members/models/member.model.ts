export interface Member {
  created_at: string;
  number: number;
  name: string;
  birthday: string;
  rg: string | null;
  cpf: string | null;
  address: string;
  baptism_date: string | null;
  previous_church: string | null;
  baptism_church: string | null;
  naturality: string | null;
  cellphone: string | null;
  tellphone: string | null;
  marital_status: string;
  email: string | null;
  member_type: string;
}
