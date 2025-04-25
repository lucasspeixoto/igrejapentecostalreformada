export interface EdLesson {
  id: string;
  course: { name: string; user: { id: string; full_name: string } }; // Tabela
  name: string; // Tabela
  link_pdf_file: string; // Tabela
  link_video_file: string; // Tabela
  course_id: string;
  created_at: string;
  description: string;
  image: string;
  enrollments: { count: number }[]; // Tabela
}
