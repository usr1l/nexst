export interface CustomJWT {
  '_id': string,
  'username': string,
};

export interface CustomErrorHandler {
  status?: number;
  message: string;
  errors?: string[]; // Or any other expected type
  stack?: string;
}
