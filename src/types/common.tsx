export interface SubLesson {
  _id: string;
  title: string;
  video: string;
  description?: string;
}

export interface Lesson {
  _id: string;
  title: string;
  subLessons?: SubLesson[];
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


export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?:"student" | "instructor" | "admin";
  profile: {
    avatar?: string;
    dob?: string;
    gender?: "male" | "female" | "other";
  };
  contact: {
    additionalEmail?: string;
    socialMedia?: {
      instagram?: string;
      linkedIn?: string;
      github?: string;
    };
  };
  phoneNumber?: string;
  isBlocked: boolean;
  isVerified: boolean;
  profession?: string;
  otp?: string;
  profit: number;
}
