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
exports.CourtService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const court_schema_1 = require("../schemas/court.schema");
const tournament_match_schema_1 = require("../schemas/tournament-match.schema");
let CourtService = class CourtService {
    courtModel;
    matchModel;
    constructor(courtModel, matchModel) {
        this.courtModel = courtModel;
        this.matchModel = matchModel;
    }
    async createCourt(name) {
        const court = new this.courtModel({ name });
        return court.save();
    }
    async getCourts() {
        return this.courtModel
            .find()
            .populate({
            path: 'currentMatchId',
            populate: [
                { path: 'entrant1Id', select: 'name' },
                { path: 'entrant2Id', select: 'name' },
                { path: 'tournamentId', select: 'name sportType' },
            ],
        })
            .exec();
    }
    async getQueuedMatches() {
        return this.matchModel
            .find({ status: 'Queue' })
            .populate('entrant1Id', 'name')
            .populate('entrant2Id', 'name')
            .populate('tournamentId', 'name sportType')
            .sort({ createdAt: 1 })
            .exec();
    }
    async assignMatchToCourt(matchId, courtId) {
        const court = await this.courtModel.findById(courtId);
        if (!court)
            throw new common_1.NotFoundException('Court not found');
        if (court.status === 'In Use')
            throw new common_1.BadRequestException('Court is already in use');
        const match = await this.matchModel.findById(matchId);
        if (!match)
            throw new common_1.NotFoundException('Match not found');
        if (match.status !== 'Queue')
            throw new common_1.BadRequestException('Match is not in Queue status');
        court.status = 'In Use';
        court.currentMatchId = match._id.toString();
        await court.save();
        match.status = 'Live';
        match.courtId = court._id.toString();
        await match.save();
        return { court, match };
    }
    async freeCourt(courtId) {
        const court = await this.courtModel.findById(courtId);
        if (!court)
            throw new common_1.NotFoundException('Court not found');
        if (court.currentMatchId) {
            const match = await this.matchModel.findById(court.currentMatchId);
            if (match && match.status === 'Live') {
            }
        }
        court.status = 'Idle';
        court.currentMatchId = undefined;
        await court.save();
        return court;
    }
};
exports.CourtService = CourtService;
exports.CourtService = CourtService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(court_schema_1.Court.name)),
    __param(1, (0, mongoose_1.InjectModel)(tournament_match_schema_1.TournamentMatch.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CourtService);
//# sourceMappingURL=court.service.js.map