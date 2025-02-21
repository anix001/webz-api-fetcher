import axios from "axios";

import { config, handleError, Logger } from "../utils";
import { WebzQueryBuilder } from "./webzQueryBuilder";
import { IWebzPost, IWebzResponse } from "../interface";
import { pool } from "../config/dbConnection";

export class WebzService {
  static async fetchAndStorePosts(callback: (result: { retrievedCount: number; remainingCount: number })=>void) {
    try {
      let fetchedCount = 0;
      let remainingCount = 0;
      let nextOffset = 0;
      const size =200; 
      const apiPath = `${config.baseUrl}newsApiLite`
      
      do{
        //[Building API url using builder pattern]
        const apiUrl: string = new WebzQueryBuilder(apiPath)
        .setToken(config.webzToken)
        .setSearchTerm("bitcoin")
        .setFrom(nextOffset)
        .setSize(size)
        .build();

       const {data} = await axios.get<IWebzResponse>(apiUrl);
       //[Note: data only includes 10 result per call as mentioned in the News API Lite documentation's Limitation part]

       if(data){       
          const posts = data.posts.map((post:IWebzPost) => ({
            title: post.title || "n/a",
            content: post.text || "n/a",
            language: post.language || "n/a",
            author: post.author ||"n/a",
            sentiment: post.sentiment || "n/a"
          }));

          for (const post of posts) {
            await pool.query(
              "INSERT INTO posts (title, content, language, author, sentiment) VALUES ($1, $2, $3, $4, $5)",
              [post.title, post.content, post.language, post.author, post.sentiment]
            );
          }
          Logger.info("Data fetched from webz.io and stored to db");

          //[Todo: if some case our insertion to db gets failed then don't fetch data that already has been stored in 
          // db and we can use bulk insertion in db ] (for future)

          fetchedCount += posts.length;
          remainingCount = data.moreResultsAvailable;
          nextOffset += 200;
       }
      }while(remainingCount>0)
      callback({ retrievedCount: fetchedCount, remainingCount });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // [It's an Axios error]
        if (err.response) {
          console.log(err.response.data);
          Logger.error(err.response.data);
        } else if (err.request) {
          console.log(err.request);
        }
      } else {
        // [Not an Axios error]
        console.log("Error", (err as Error).message);
        Logger.error(err instanceof Error ? String(err) : String(err));
      }
    }
  }
}
