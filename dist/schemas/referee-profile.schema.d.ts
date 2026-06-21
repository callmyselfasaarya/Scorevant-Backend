import { Document } from 'mongoose';
export type RefereeProfileDocument = RefereeProfile & Document;
export declare class RefereeProfile {
    userId: string;
    email: string;
    displayName?: string;
    totalMatchesOfficiated: number;
}
export declare const RefereeProfileSchema: import("mongoose").Schema<RefereeProfile, import("mongoose").Model<RefereeProfile, any, any, any, any, any, RefereeProfile>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RefereeProfile, Document<unknown, {}, RefereeProfile, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<RefereeProfile & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<string, RefereeProfile, Document<unknown, {}, RefereeProfile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RefereeProfile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, RefereeProfile, Document<unknown, {}, RefereeProfile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RefereeProfile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    displayName?: import("mongoose").SchemaDefinitionProperty<string | undefined, RefereeProfile, Document<unknown, {}, RefereeProfile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RefereeProfile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    totalMatchesOfficiated?: import("mongoose").SchemaDefinitionProperty<number, RefereeProfile, Document<unknown, {}, RefereeProfile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RefereeProfile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, RefereeProfile>;
