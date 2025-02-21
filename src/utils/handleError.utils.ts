export function handleError(err: unknown, context:string ):never{
    if(err instanceof Error){
        // Handle the instance of Error
        throw new Error(`${context}: ${err.message}`);
    }else{
        //Handle unexpected error types
        throw new Error(`${context}: An unexpected error occurred`);
    }
}