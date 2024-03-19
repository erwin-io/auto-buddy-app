"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const axios_1 = require("@nestjs/axios");
const node_fetch_1 = __importDefault(require("node-fetch"));
const common_2 = require("@nestjs/common");
const sharp_1 = __importDefault(require("sharp"));
const FormData = require('form-data');
let AppController = class AppController {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getRemoveBackground(url) {
        try {
            const imageResponse = await this.httpService.get(url, {
                responseType: "arraybuffer",
            }).toPromise();
            const img = await (0, sharp_1.default)(imageResponse.data).toFormat('png').toBuffer();
            const formData = new FormData();
            formData.append('file', img, 'image.png');
            const config = {
                headers: Object.assign({ 'Origin': 'https://www.switchboard.ai' }, formData.getHeaders()),
            };
            const result = await this.httpService.post('https://www.switchboard.ai/marketing/background', formData, Object.assign(Object.assign({}, config), { responseType: "arraybuffer" })).toPromise();
            const base64 = `data:image/png;base64,${Buffer.from(await (0, sharp_1.default)(result.data).toBuffer()).toString('base64')}`;
            return base64;
        }
        catch (e) {
            return {
                message: e,
                success: false,
            };
        }
    }
    async getAllCarMakes() {
        try {
            const response = await (0, node_fetch_1.default)("https://apisearch.topgear.com.ph/topgear/v1/buyers-guide/makes/", {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'https://www.topgear.com.ph'
                },
            });
            const data = await response.json();
            return {
                data: data.filter(x => x.vehicle_type === "car" && !x.name.toLowerCase().includes("test")),
                success: true,
            };
        }
        catch (e) {
            return {
                message: e,
                success: false,
            };
        }
    }
    async getAllMotorcycleMakes() {
        try {
            const response = await (0, node_fetch_1.default)("https://apisearch.topgear.com.ph/topgear/v1/buyers-guide/makes/", {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'https://www.topgear.com.ph'
                },
            });
            const data = await response.json();
            return {
                data: data.filter(x => x.vehicle_type === "motorcycle"),
                success: true,
            };
        }
        catch (e) {
            return {
                message: e,
                success: false,
            };
        }
    }
    async getModel(make, model) {
        try {
            const response = await (0, node_fetch_1.default)(`https://apisearch.topgear.com.ph/topgear/v1/buyers-guide/search-vehicles/motorcycle?keywords=${make ? make : ''}&filterType=vehicle_name&match=wildcard`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'https://www.topgear.com.ph'
                },
            });
            return {
                data: response,
                success: true,
            };
        }
        catch (e) {
            return {
                message: e,
                success: false,
            };
        }
    }
};
__decorate([
    (0, common_1.Get)("/getRemoveBackground"),
    (0, swagger_1.ApiQuery)({ name: "url", required: true, type: String }),
    __param(0, (0, common_2.Query)("url")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getRemoveBackground", null);
__decorate([
    (0, common_1.Get)("/makes/car"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllCarMakes", null);
__decorate([
    (0, common_1.Get)("/makes/motorcycle"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllMotorcycleMakes", null);
__decorate([
    (0, common_1.Get)("/model"),
    (0, swagger_1.ApiQuery)({ name: "make", required: true, type: String }),
    (0, swagger_1.ApiQuery)({ name: "model", required: false, type: String }),
    __param(0, (0, common_2.Query)("make")),
    __param(1, (0, common_2.Query)("make")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getModel", null);
AppController = __decorate([
    (0, swagger_1.ApiTags)("api"),
    (0, common_1.Controller)("api"),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map