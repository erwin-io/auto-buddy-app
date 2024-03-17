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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let SearchController = class SearchController {
    constructor() { }
    async getDetails() {
        try {
            return {
                data: [],
                success: true,
            };
        }
        catch (e) {
            return {
                message: [],
                success: false,
            };
        }
    }
};
__decorate([
    (0, common_1.Get)("/makes"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "getDetails", null);
SearchController = __decorate([
    (0, swagger_1.ApiTags)("search"),
    (0, common_1.Controller)("search"),
    __metadata("design:paramtypes", [])
], SearchController);
exports.SearchController = SearchController;
//# sourceMappingURL=api.controller.js.map