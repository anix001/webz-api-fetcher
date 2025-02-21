import {Pool} from "pg";
import { config } from "../utils";

export const pool = new Pool({
connectionString: config.databaseUrl,
});
