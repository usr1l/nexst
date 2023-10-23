import express, { Router, Response, Request } from 'express';
import apiRouter from './api';

const router: Router = Router();

router.use('/api', apiRouter);

router.get('/hello/world', function (req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});


// if (process.env.NODE_ENV === 'production') {
//   const path = require('path');
//   // Serve the frontend's index.html file at the root route
//   router.get('/', (req, res) => {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.sendFile(
//       path.resolve(__dirname, '../../frontend', 'build', 'index.html')
//     );
//   });

//   // Serve the static assets in the frontend's build folder
//   router.use(express.static(path.resolve("../frontend/build")));

//   // Serve the frontend's index.html file at all other routes NOT starting with /api
//   router.get(/^(?!\/?api).*/, (req, res) => {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.sendFile(
//       path.resolve(__dirname, '../../frontend', 'build', 'index.html')
//     );
//   });
// }


if (process.env.NODE_ENV !== 'production') {
  // Add a XSRF-TOKEN cookie
  router.get("/api/csrf/restore", (req: Request, res: Response) => {
    const csrfToken: string = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });
}

router.get('/', (req: Request, res: Response) => {
  // return res.json({ requestBody: req.body });
  return res.json('Hello World');
})

export default router;
