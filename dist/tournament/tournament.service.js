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
exports.TournamentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tournament_schema_1 = require("../schemas/tournament.schema");
const entrant_schema_1 = require("../schemas/entrant.schema");
const tournament_match_schema_1 = require("../schemas/tournament-match.schema");
let TournamentService = class TournamentService {
    tournamentModel;
    entrantModel;
    matchModel;
    constructor(tournamentModel, entrantModel, matchModel) {
        this.tournamentModel = tournamentModel;
        this.entrantModel = entrantModel;
        this.matchModel = matchModel;
    }
    async createTournament(userId, data) {
        const tournament = await this.tournamentModel.create({
            name: data.name,
            sportType: data.sportType,
            maxSets: data.maxSets,
            userId,
            status: 'Upcoming',
        });
        const entrantDocs = data.entrants.map((e) => ({
            name: e.name,
            seed: e.seed,
            tournamentId: tournament._id,
        }));
        await this.entrantModel.insertMany(entrantDocs);
        return tournament;
    }
    async generateBracket(tournamentId) {
        const tournament = await this.tournamentModel.findById(tournamentId);
        if (!tournament)
            throw new common_1.NotFoundException('Tournament not found');
        const entrants = await this.entrantModel
            .find({ tournamentId })
            .sort({ seed: 1 })
            .exec();
        const numEntrants = entrants.length;
        if (numEntrants < 2)
            throw new common_1.BadRequestException('Not enough entrants');
        let pow = 1;
        while (pow < numEntrants)
            pow *= 2;
        const numByes = pow - numEntrants;
        const slots = [...entrants];
        for (let i = 0; i < numByes; i++)
            slots.push(null);
        let currentRoundEntrants = slots;
        let roundNumber = 1;
        let previousRoundMatches = [];
        await this.matchModel.deleteMany({ tournamentId });
        while (currentRoundEntrants.filter((e) => e).length > 1) {
            const isFirstRound = roundNumber === 1;
            const numMatches = isFirstRound
                ? currentRoundEntrants.length / 2
                : previousRoundMatches.length / 2;
            const currentRoundMatches = [];
            for (let i = 0; i < numMatches; i++) {
                let entrant1Id = null;
                let entrant2Id = null;
                let winnerId = null;
                let status = 'Upcoming';
                if (isFirstRound) {
                    const e1 = currentRoundEntrants[i * 2];
                    const e2 = currentRoundEntrants[i * 2 + 1];
                    entrant1Id = e1 ? e1._id.toString() : null;
                    entrant2Id = e2 ? e2._id.toString() : null;
                    if (entrant1Id && !entrant2Id) {
                        winnerId = entrant1Id;
                        status = 'Completed';
                    }
                    else if (!entrant1Id && entrant2Id) {
                        winnerId = entrant2Id;
                        status = 'Completed';
                    }
                    else {
                        status = 'Queue';
                    }
                }
                else {
                    const prevMatch1 = previousRoundMatches[i * 2];
                    const prevMatch2 = previousRoundMatches[i * 2 + 1];
                    if (prevMatch1?.winnerId)
                        entrant1Id = prevMatch1.winnerId;
                    if (prevMatch2?.winnerId)
                        entrant2Id = prevMatch2.winnerId;
                    status = entrant1Id && entrant2Id ? 'Queue' : 'Upcoming';
                }
                const match = new this.matchModel({
                    tournamentId,
                    round: roundNumber,
                    matchNumber: i + 1,
                    entrant1Id,
                    entrant2Id,
                    winnerId,
                    status,
                });
                await match.save();
                currentRoundMatches.push(match);
                if (!isFirstRound) {
                    const prevMatch1 = previousRoundMatches[i * 2];
                    const prevMatch2 = previousRoundMatches[i * 2 + 1];
                    if (prevMatch1) {
                        prevMatch1.nextMatchId = match._id.toString();
                        await prevMatch1.save();
                    }
                    if (prevMatch2) {
                        prevMatch2.nextMatchId = match._id.toString();
                        await prevMatch2.save();
                    }
                }
            }
            const nextRoundEntrants = currentRoundMatches.map((m) => {
                if (m.winnerId)
                    return { _id: m.winnerId };
                if (m.status === 'Completed' && m.winnerId)
                    return { _id: m.winnerId };
                return null;
            });
            previousRoundMatches = currentRoundMatches;
            currentRoundEntrants = nextRoundEntrants;
            roundNumber++;
        }
        tournament.status = 'Live';
        await tournament.save();
        return { message: 'Bracket generated successfully' };
    }
    async getTournaments(userId) {
        return this.tournamentModel.find({ userId }).sort({ createdAt: -1 }).exec();
    }
    async getTournamentDetails(id) {
        const tournament = await this.tournamentModel.findById(id);
        if (!tournament)
            throw new common_1.NotFoundException('Tournament not found');
        const entrants = await this.entrantModel.find({ tournamentId: id }).exec();
        const matches = await this.matchModel
            .find({ tournamentId: id })
            .populate('entrant1Id', 'name')
            .populate('entrant2Id', 'name')
            .populate('winnerId', 'name')
            .populate('courtId', 'name')
            .sort({ round: 1, matchNumber: 1 })
            .exec();
        return { tournament, entrants, matches };
    }
    async updateMatch(matchId, data) {
        const match = await this.matchModel.findById(matchId);
        if (!match)
            throw new common_1.NotFoundException('Match not found');
        if (data.score)
            match.score = data.score;
        if (data.status)
            match.status = data.status;
        if (data.winnerId) {
            match.winnerId = data.winnerId;
            match.status = 'Completed';
            if (match.nextMatchId) {
                const nextMatch = await this.matchModel.findById(match.nextMatchId);
                if (nextMatch) {
                    if (!nextMatch.entrant1Id) {
                        nextMatch.entrant1Id = match.winnerId;
                    }
                    else if (!nextMatch.entrant2Id) {
                        nextMatch.entrant2Id = match.winnerId;
                    }
                    if (nextMatch.entrant1Id && nextMatch.entrant2Id) {
                        nextMatch.status = 'Queue';
                    }
                    await nextMatch.save();
                }
            }
        }
        await match.save();
        return match;
    }
};
exports.TournamentService = TournamentService;
exports.TournamentService = TournamentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tournament_schema_1.Tournament.name)),
    __param(1, (0, mongoose_1.InjectModel)(entrant_schema_1.Entrant.name)),
    __param(2, (0, mongoose_1.InjectModel)(tournament_match_schema_1.TournamentMatch.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], TournamentService);
//# sourceMappingURL=tournament.service.js.map