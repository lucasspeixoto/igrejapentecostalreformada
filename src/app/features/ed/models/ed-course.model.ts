export interface EdCourse {
  id: string;
  name: string;
  description: string;
  created_at: string;
  user_id: string;
  /* photo: string; */
  users: { full_name: string; avatar_url: string }[];
  ed_lessons: { count: number }[];
}
