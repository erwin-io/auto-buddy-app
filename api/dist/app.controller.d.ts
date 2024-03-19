import { HttpService } from "@nestjs/axios";
import fetch from 'node-fetch';
export declare class AppController {
    private readonly httpService;
    constructor(httpService: HttpService);
    getRemoveBackground(url: any): Promise<string | {
        message: any;
        success: boolean;
    }>;
    getAllCarMakes(): Promise<{
        data: any;
        success: boolean;
        message?: undefined;
    } | {
        message: any;
        success: boolean;
        data?: undefined;
    }>;
    getAllMotorcycleMakes(): Promise<{
        data: any;
        success: boolean;
        message?: undefined;
    } | {
        message: any;
        success: boolean;
        data?: undefined;
    }>;
    getModel(make: any, model: any): Promise<{
        data: fetch.Response;
        success: boolean;
        message?: undefined;
    } | {
        message: any;
        success: boolean;
        data?: undefined;
    }>;
}
