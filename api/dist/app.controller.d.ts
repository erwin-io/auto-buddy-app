import { HttpService } from "@nestjs/axios";
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
    getCarModel(make: any): Promise<{
        data: any[];
        success: boolean;
        message?: undefined;
    } | {
        message: any;
        success: boolean;
        data?: undefined;
    }>;
    getMotorcycleModel(make: any): Promise<{
        data: any[];
        success: boolean;
        message?: undefined;
    } | {
        message: any;
        success: boolean;
        data?: undefined;
    }>;
}
