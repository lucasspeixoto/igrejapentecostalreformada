export interface Cult {
  id: string;
  created_at: string;
  date: string; // Calendar
  video_url: string;
  text_url: string;
  title: string;
  description: string;
  preacher_id: string;
  users: { full_name: string }; // preacher name
}
