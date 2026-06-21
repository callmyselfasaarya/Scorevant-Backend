import { Model, type Types } from 'mongoose';
import { Court, CourtDocument } from '../schemas/court.schema';
import { TournamentMatch, TournamentMatchDocument } from '../schemas/tournament-match.schema';
export declare class CourtService {
    private courtModel;
    private matchModel;
    constructor(courtModel: Model<CourtDocument>, matchModel: Model<TournamentMatchDocument>);
    createCourt(name: string): Promise<import("mongoose").Document<unknown, {}, CourtDocument, {}, import("mongoose").DefaultSchemaOptions> & Court & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getCourts(): Promise<(import("mongoose").Document<unknown, {}, CourtDocument, {}, import("mongoose").DefaultSchemaOptions> & Court & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getQueuedMatches(): Promise<(import("mongoose").Document<unknown, {}, TournamentMatchDocument, {}, import("mongoose").DefaultSchemaOptions> & TournamentMatch & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    assignMatchToCourt(matchId: string, courtId: string): Promise<{
        court: import("mongoose").Document<unknown, {}, CourtDocument, {}, import("mongoose").DefaultSchemaOptions> & Court & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        match: import("mongoose").Document<unknown, {}, TournamentMatchDocument, {}, import("mongoose").DefaultSchemaOptions> & TournamentMatch & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    freeCourt(courtId: string): Promise<import("mongoose").Document<unknown, {}, CourtDocument, {}, import("mongoose").DefaultSchemaOptions> & Court & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
