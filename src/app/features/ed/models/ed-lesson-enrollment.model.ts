export interface EdLessonEnrollment {
  id: string;
  lesson_id: string;
  user_id: string;
  status: string;
  created_at: string;
  ed_courses: { name: string };
  ed_lessons: { name: string };
  users: { full_name: string };
}
