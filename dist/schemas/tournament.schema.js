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
exports.TournamentSchema = exports.Tournament = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Tournament = class Tournament {
    name;
    sportType;
    maxSets;
    status;
    userId;
};
exports.Tournament = Tournament;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Tournament.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Tournament.prototype, "sportType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 3 }),
    __metadata("design:type", Number)
], Tournament.prototype, "maxSets", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'Upcoming' }),
    __metadata("design:type", String)
], Tournament.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Tournament.prototype, "userId", void 0);
exports.Tournament = Tournament = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Tournament);
exports.TournamentSchema = mongoose_1.SchemaFactory.createForClass(Tournament);
//# sourceMappingURL=tournament.schema.js.map