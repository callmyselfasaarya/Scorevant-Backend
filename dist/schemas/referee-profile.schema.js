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
exports.RefereeProfileSchema = exports.RefereeProfile = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let RefereeProfile = class RefereeProfile {
    userId;
    email;
    displayName;
    totalMatchesOfficiated;
};
exports.RefereeProfile = RefereeProfile;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], RefereeProfile.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], RefereeProfile.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], RefereeProfile.prototype, "displayName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], RefereeProfile.prototype, "totalMatchesOfficiated", void 0);
exports.RefereeProfile = RefereeProfile = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], RefereeProfile);
exports.RefereeProfileSchema = mongoose_1.SchemaFactory.createForClass(RefereeProfile);
//# sourceMappingURL=referee-profile.schema.js.map