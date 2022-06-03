export interface Author {
  id: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  role: string;
  isActive: boolean;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  date: number;
  photoURL: string;
  isPublished: boolean;
  author: Author
}