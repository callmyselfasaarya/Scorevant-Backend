"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourtModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const court_controller_1 = require("./court.controller");
const court_service_1 = require("./court.service");
const court_schema_1 = require("../schemas/court.schema");
const tournament_match_schema_1 = require("../schemas/tournament-match.schema");
const umpire_schema_1 = require("../schemas/umpire.schema");
let CourtModule = class CourtModule {
};
exports.CourtModule = CourtModule;
exports.CourtModule = CourtModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: court_schema_1.Court.name, schema: court_schema_1.CourtSchema },
                { name: tournament_match_schema_1.TournamentMatch.name, schema: tournament_match_schema_1.TournamentMatchSchema },
                { name: umpire_schema_1.Umpire.name, schema: umpire_schema_1.UmpireSchema },
            ]),
        ],
        controllers: [court_controller_1.CourtController],
        providers: [court_service_1.CourtService],
    })
], CourtModule);
//# sourceMappingURL=court.module.js.map