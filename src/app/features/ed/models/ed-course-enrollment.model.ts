export interface EdCourseEnrollment {
  id: string;
  course_id: string;
  user_id: string;
  status: string;
  created_at: string;
  ed_courses: { name: string };
  users: { full_name: string };
}
