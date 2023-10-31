export interface CustomJWT {
  'id': string,
  'username': string,
};

export interface UserJWT extends CustomJWT {
  'id': string,
  'username': string,
  'iat': number,
  'exp': number
}

export interface CustomErrorHandler {
  title?: string;
  status?: number;
  message: string;
  errors?: string[]; // Or any other expected type
  stack?: string;
}
