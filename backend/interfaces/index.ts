export interface CustomJWT {
  id: string
  username: string,
  email: string,
  firstname: string,
  lastname: string
};

export interface CustomErrorHandler {
  title?: string;
  status?: number;
  message: string;
  errors?: string[]; // Or any other expected type
  stack?: string;
}
