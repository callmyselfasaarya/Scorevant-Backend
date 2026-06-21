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
exports.TournamentMatchSchema = exports.TournamentMatch = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TournamentMatch = class TournamentMatch {
    tournamentId;
    round;
    matchNumber;
    entrant1Id;
    entrant2Id;
    winnerId;
    score;
    status;
    courtId;
    umpireId;
    nextMatchId;
};
exports.TournamentMatch = TournamentMatch;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true,
    }),
    __metadata("design:type", String)
], TournamentMatch.prototype, "tournamentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], TournamentMatch.prototype, "round", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], TournamentMatch.prototype, "matchNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Entrant', default: null }),
    __metadata("design:type", Object)
], TournamentMatch.prototype, "entrant1Id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Entrant', default: null }),
    __metadata("design:type", Object)
], TournamentMatch.prototype, "entrant2Id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Entrant', default: null }),
    __metadata("design:type", Object)
], TournamentMatch.prototype, "winnerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], TournamentMatch.prototype, "score", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['Upcoming', 'Queue', 'Live', 'Delayed', 'Completed'],
        default: 'Upcoming',
    }),
    __metadata("design:type", String)
], TournamentMatch.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Court', default: null }),
    __metadata("design:type", Object)
], TournamentMatch.prototype, "courtId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Umpire', default: null }),
    __metadata("design:type", Object)
], TournamentMatch.prototype, "umpireId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'TournamentMatch',
        default: null,
    }),
    __metadata("design:type", Object)
], TournamentMatch.prototype, "nextMatchId", void 0);
exports.TournamentMatch = TournamentMatch = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], TournamentMatch);
exports.TournamentMatchSchema = mongoose_1.SchemaFactory.createForClass(TournamentMatch);
//# sourceMappingURL=tournament-match.schema.js.map