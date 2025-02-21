export interface HttpError extends Error{
    status?:number
}

export interface IWebzPost{
    title:string;
    text:string;
    language:string;
    author:string;
    sentiment:string;
}

export interface IWebzResponse{
    posts: IWebzPost[];
    totalResults:number;
    moreResultsAvailable: number;
    next:string;
    requestsLeft:number;
}

