import { Model } from 'mongoose';
import { Tournament, TournamentDocument } from '../schemas/tournament.schema';
import { Entrant, EntrantDocument } from '../schemas/entrant.schema';
import { TournamentMatch, TournamentMatchDocument } from '../schemas/tournament-match.schema';
export declare class TournamentService {
    private tournamentModel;
    private entrantModel;
    private matchModel;
    constructor(tournamentModel: Model<TournamentDocument>, entrantModel: Model<EntrantDocument>, matchModel: Model<TournamentMatchDocument>);
    createTournament(userId: string, data: {
        name: string;
        sportType: string;
        maxSets: number;
        entrants: {
            name: string;
            seed?: number;
        }[];
    }): Promise<import("mongoose").Document<unknown, {}, TournamentDocument, {}, import("mongoose").DefaultSchemaOptions> & Tournament & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    generateBracket(tournamentId: string): Promise<{
        message: string;
    }>;
    getTournaments(userId: string): Promise<(import("mongoose").Document<unknown, {}, TournamentDocument, {}, import("mongoose").DefaultSchemaOptions> & Tournament & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getTournamentDetails(id: string): Promise<{
        tournament: import("mongoose").Document<unknown, {}, TournamentDocument, {}, import("mongoose").DefaultSchemaOptions> & Tournament & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        entrants: (import("mongoose").Document<unknown, {}, EntrantDocument, {}, import("mongoose").DefaultSchemaOptions> & Entrant & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        matches: (import("mongoose").Document<unknown, {}, TournamentMatchDocument, {}, import("mongoose").DefaultSchemaOptions> & TournamentMatch & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    updateMatch(matchId: string, data: {
        score?: unknown;
        winnerId?: string;
        status?: string;
    }): Promise<import("mongoose").Document<unknown, {}, TournamentMatchDocument, {}, import("mongoose").DefaultSchemaOptions> & TournamentMatch & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
