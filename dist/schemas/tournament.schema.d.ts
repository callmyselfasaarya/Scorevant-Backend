import { Document } from 'mongoose';
export type TournamentDocument = Tournament & Document;
export declare class Tournament {
    name: string;
    sportType: string;
    maxSets: number;
    status: string;
    userId?: string;
}
export declare const TournamentSchema: import("mongoose").Schema<Tournament, import("mongoose").Model<Tournament, any, any, any, any, any, Tournament>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Tournament, Document<unknown, {}, Tournament, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Tournament & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Tournament, Document<unknown, {}, Tournament, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tournament & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sportType?: import("mongoose").SchemaDefinitionProperty<string, Tournament, Document<unknown, {}, Tournament, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tournament & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    maxSets?: import("mongoose").SchemaDefinitionProperty<number, Tournament, Document<unknown, {}, Tournament, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tournament & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Tournament, Document<unknown, {}, Tournament, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tournament & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    userId?: import("mongoose").SchemaDefinitionProperty<string | undefined, Tournament, Document<unknown, {}, Tournament, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tournament & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Tournament>;
