import {Request, Response, NextFunction} from "express";
import { HttpError } from "../interface";
import { Logger } from "../utils";

export const errorHandler = (err:HttpError, req:Request, res:Response, next:NextFunction):void=>{
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    //Log the error
    Logger.error(`${status} - ${message}`);

    //Send error response
    res.status(status).json({
        success: false,
        status,
        message
    });
};