import { HttpService } from "@nestjs/axios";
export declare class AppController {
    private readonly httpService;
    constructor(httpService: HttpService);
    getMakes(type: any): Promise<any>;
    getModel(make: any, model: any): Promise<any>;
}
