export interface CustomJWT {
  '_id': string,
  'username': string,
};

export interface CustomErrorHandler {
  title?: string;
  status?: number;
  message: string;
  errors?: string[]; // Or any other expected type
  stack?: string;
}
