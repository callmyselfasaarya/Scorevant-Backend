import { CourtService } from './court.service';
export declare class CourtController {
    private readonly courtService;
    constructor(courtService: CourtService);
    createCourt(data: {
        name: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../schemas/court.schema").CourtDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/court.schema").Court & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getCourts(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/court.schema").CourtDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/court.schema").Court & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getQueuedMatches(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/tournament-match.schema").TournamentMatchDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/tournament-match.schema").TournamentMatch & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    assignMatchToCourt(courtId: string, data: {
        matchId: string;
    }): Promise<{
        court: import("mongoose").Document<unknown, {}, import("../schemas/court.schema").CourtDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/court.schema").Court & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        match: import("mongoose").Document<unknown, {}, import("../schemas/tournament-match.schema").TournamentMatchDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/tournament-match.schema").TournamentMatch & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    freeCourt(courtId: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/court.schema").CourtDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/court.schema").Court & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
