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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourtController = void 0;
const common_1 = require("@nestjs/common");
const court_service_1 = require("./court.service");
let CourtController = class CourtController {
    courtService;
    constructor(courtService) {
        this.courtService = courtService;
    }
    createCourt(data) {
        return this.courtService.createCourt(data.name);
    }
    getCourts() {
        return this.courtService.getCourts();
    }
    getQueuedMatches() {
        return this.courtService.getQueuedMatches();
    }
    assignMatchToCourt(courtId, data) {
        return this.courtService.assignMatchToCourt(data.matchId, courtId);
    }
    freeCourt(courtId) {
        return this.courtService.freeCourt(courtId);
    }
};
exports.CourtController = CourtController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CourtController.prototype, "createCourt", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourtController.prototype, "getCourts", null);
__decorate([
    (0, common_1.Get)('queue'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourtController.prototype, "getQueuedMatches", null);
__decorate([
    (0, common_1.Put)(':id/assign'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CourtController.prototype, "assignMatchToCourt", null);
__decorate([
    (0, common_1.Put)(':id/free'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourtController.prototype, "freeCourt", null);
exports.CourtController = CourtController = __decorate([
    (0, common_1.Controller)('courts'),
    __metadata("design:paramtypes", [court_service_1.CourtService])
], CourtController);
//# sourceMappingURL=court.controller.js.map