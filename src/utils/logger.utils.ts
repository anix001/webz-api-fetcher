import fs, { appendFileSync } from 'fs';
import path from 'path';

//[Logger Types]
type LogType = 'info' | 'error';

//[Logger Class]
class Logger{
    private logFilePath:string;
    
    //[constructor function]
    constructor(logFileName:string="application.log"){
        this.logFilePath = path.join(__dirname,'../logs', logFileName); //[path of the log file]

        //[ If directory does not exist, we need to create the directory]
        if(!fs.existsSync(path.dirname(this.logFilePath))){
            fs.mkdirSync(path.dirname(this.logFilePath), {recursive:true});
        }
    }
    
    // [Formatting the log message to store in log file]
    private formatMessage(logType:LogType, message:string):string{
        const timeStamp = new Date().toISOString();
        return `${timeStamp}  [${logType.toUpperCase()}]:  ${message}\n`;
    }

    // [Writing log to the logger file]
     private writeLog(logType:LogType, message:string):void{
        const loggerMessage = this.formatMessage(logType, message);
        fs.appendFileSync(this.logFilePath, loggerMessage, 'utf-8');
     }

    // [Public methods]
    info(message: string): void {
        this.writeLog('info', message);
    }

    error(message: string): void {
        this.writeLog('error', message);
    }
}

export default new Logger();