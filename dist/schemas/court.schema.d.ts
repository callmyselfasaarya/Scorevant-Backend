import { Document, Schema as MongooseSchema } from 'mongoose';
export type CourtDocument = Court & Document;
export declare class Court {
    name: string;
    status: string;
    currentMatchId?: string;
}
export declare const CourtSchema: MongooseSchema<Court, import("mongoose").Model<Court, any, any, any, any, any, Court>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Court, Document<unknown, {}, Court, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Court & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Court, Document<unknown, {}, Court, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Court & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Court, Document<unknown, {}, Court, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Court & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    currentMatchId?: import("mongoose").SchemaDefinitionProperty<string | undefined, Court, Document<unknown, {}, Court, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Court & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Court>;
