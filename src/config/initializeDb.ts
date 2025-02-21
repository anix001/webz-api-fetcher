import { Logger } from "../utils";
import { pool } from "./dbConnection";

export const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        language VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        sentiment VARCHAR(255) NOT NULL
      );
    `);
    //[Todo: call pool.query only if table not created]
    console.log("Posts table created");
    Logger.info("Posts table created");
  } catch (error) {
    console.error("Error initializing database:", error);
    Logger.error(error as string);
  }
};


