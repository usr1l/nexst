import http from 'http';
import app from '../src/index';
const { port } = require('../config');


export const server = () => http.createServer(app).listen(port, () => {
  console.log(`Server running on port ${port}`);
});
