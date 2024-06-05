export interface SubLesson {
  title: string;
  video: string;
  description?: string;
}

export interface Lesson {
  title: string;
  subLessons: SubLesson[];
}

export interface Trial {
  title?: string;
  description?: string[];
  thumbnail?: string;
  video?: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructorRef: {
    _id: string;
    firstName?: string;
  };
  categoryRef: {
    _id: string;
    title?: string;
  };
  language: string;
  pricing: {
    type: string;
    amount: number;
  };
  isBlocked: boolean;
  attachments?: string;
  isPublished: boolean;
  lessons: Lesson[];
  trial?: Trial;
  createdAt: string;
  updatedAt: string;
}
