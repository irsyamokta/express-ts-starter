import { Request } from "express";
import { UAParser } from 'ua-parser-js'

export const getDeviceInfo = (req: Request) => {
    const ua = new UAParser(req.headers['user-agent'])
    const result = ua.getResult()
    return `${result.os.name} - ${result.browser.name}`;
};