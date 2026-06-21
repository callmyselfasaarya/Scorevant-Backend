import { Document, Schema as MongooseSchema } from 'mongoose';
export type EntrantDocument = Entrant & Document;
export declare class Entrant {
    name: string;
    seed?: number;
    tournamentId: string;
}
export declare const EntrantSchema: MongooseSchema<Entrant, import("mongoose").Model<Entrant, any, any, any, any, any, Entrant>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Entrant, Document<unknown, {}, Entrant, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Entrant & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Entrant, Document<unknown, {}, Entrant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Entrant & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    seed?: import("mongoose").SchemaDefinitionProperty<number | undefined, Entrant, Document<unknown, {}, Entrant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Entrant & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    tournamentId?: import("mongoose").SchemaDefinitionProperty<string, Entrant, Document<unknown, {}, Entrant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Entrant & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Entrant>;
