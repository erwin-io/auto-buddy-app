export declare class SearchController {
    constructor();
    getDetails(): Promise<{
        data: any[];
        success: boolean;
        message?: undefined;
    } | {
        message: any[];
        success: boolean;
        data?: undefined;
    }>;
}
