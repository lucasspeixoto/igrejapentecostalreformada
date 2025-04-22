export interface EdCourse {
  id: string;
  name: string;
  description: string;
  created_at: string;
  user_id: string;
  users: { full_name: string };
  ed_lessons: { count: number }[];
}
