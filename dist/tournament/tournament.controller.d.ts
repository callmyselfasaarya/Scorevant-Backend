import { TournamentService } from './tournament.service';
export declare class TournamentController {
    private readonly tournamentService;
    constructor(tournamentService: TournamentService);
    createTournament(req: {
        user: {
            userId: string;
        };
    }, data: {
        name: string;
        sportType: string;
        maxSets: number;
        entrants: {
            name: string;
            seed?: number;
        }[];
    }): Promise<import("mongoose").Document<unknown, {}, import("../schemas/tournament.schema").TournamentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/tournament.schema").Tournament & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getTournaments(req: {
        user: {
            userId: string;
        };
    }): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/tournament.schema").TournamentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/tournament.schema").Tournament & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getTournamentDetails(id: string): Promise<{
        tournament: import("mongoose").Document<unknown, {}, import("../schemas/tournament.schema").TournamentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/tournament.schema").Tournament & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        entrants: (import("mongoose").Document<unknown, {}, import("../schemas/entrant.schema").EntrantDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/entrant.schema").Entrant & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        matches: (import("mongoose").Document<unknown, {}, import("../schemas/tournament-match.schema").TournamentMatchDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/tournament-match.schema").TournamentMatch & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    generateBracket(id: string): Promise<{
        message: string;
    }>;
    updateMatch(matchId: string, data: {
        score?: unknown;
        winnerId?: string;
        status?: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../schemas/tournament-match.schema").TournamentMatchDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/tournament-match.schema").TournamentMatch & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
