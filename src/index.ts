// src/server.ts
import  express from 'express';
import * as bodyParser from 'body-parser';
import { RegisterRoutes } from './routes';
import * as swaggerUi from 'swagger-ui-express';
import * as path from 'path';
import  AppDataSource from './data-source';

import * as swaggerJson from  "./swagger.json";
import logger from './middlewares/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve Swagger UI
/*
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup({}, {
  swaggerOptions: {
    url: '/swagger.json',
  },
}));
*/

app.use((req: express.Request, _: express.Response, next: express.NextFunction) => {
  logger.info(req.url);
  next();
})

app.use(["/openapi", "/docs", "/swagger"], swaggerUi.serve, swaggerUi.setup(swaggerJson));



// Register TSOA routes
RegisterRoutes(app);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
