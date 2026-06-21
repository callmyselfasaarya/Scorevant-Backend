import { Document } from 'mongoose';
export type UmpireDocument = Umpire & Document;
export declare class Umpire {
    name: string;
}
export declare const UmpireSchema: import("mongoose").Schema<Umpire, import("mongoose").Model<Umpire, any, any, any, any, any, Umpire>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Umpire, Document<unknown, {}, Umpire, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Umpire & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Umpire, Document<unknown, {}, Umpire, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Umpire & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Umpire>;
