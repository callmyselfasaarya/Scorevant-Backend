"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tournament_controller_1 = require("./tournament.controller");
const tournament_service_1 = require("./tournament.service");
const tournament_schema_1 = require("../schemas/tournament.schema");
const entrant_schema_1 = require("../schemas/entrant.schema");
const tournament_match_schema_1 = require("../schemas/tournament-match.schema");
let TournamentModule = class TournamentModule {
};
exports.TournamentModule = TournamentModule;
exports.TournamentModule = TournamentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: tournament_schema_1.Tournament.name, schema: tournament_schema_1.TournamentSchema },
                { name: entrant_schema_1.Entrant.name, schema: entrant_schema_1.EntrantSchema },
                { name: tournament_match_schema_1.TournamentMatch.name, schema: tournament_match_schema_1.TournamentMatchSchema },
            ]),
        ],
        controllers: [tournament_controller_1.TournamentController],
        providers: [tournament_service_1.TournamentService],
    })
], TournamentModule);
//# sourceMappingURL=tournament.module.js.map