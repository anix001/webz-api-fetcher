import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";

import { config, Logger } from "./utils";
import { corsOptions, errorHandler } from "./middleware";
import appRoutes from "./routes";
import { WebzQueryBuilder } from "./services/webzQueryBuilder";
import { WebzService } from "./services/webzService";
import { initializeDatabase } from "./config/initializeDb";

const app: Express = express();
const port = config.port;

//[for json parse]
app.use(express.json());
//[for cors]
app.use(cors(corsOptions));
//[for logging API Request]
app.use((req: Request, res: Response, next: NextFunction) => {
  Logger.info(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

//[Initialize db for table creation]
initializeDatabase();

// [routes]
app.use("/api", appRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Boilerplate");
});

//[Calling the newsApiLite API and store into db]
WebzService.fetchAndStorePosts((result) => {
  console.log("Fetch Complete:", result);
});

//[error middleware]
app.use(errorHandler);

app.listen(port, () => {
  Logger.info(`Server is running on port ${port}!!`);
  console.log(`[server]: Server is running on port ${port}!!`);
});
