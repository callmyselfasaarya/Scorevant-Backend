import { Document, Schema as MongooseSchema } from 'mongoose';
export type TournamentMatchDocument = TournamentMatch & Document;
export declare class TournamentMatch {
    tournamentId: string;
    round: number;
    matchNumber: number;
    entrant1Id?: string | null;
    entrant2Id?: string | null;
    winnerId?: string | null;
    score: any;
    status: string;
    courtId?: string | null;
    umpireId?: string | null;
    nextMatchId?: string | null;
}
export declare const TournamentMatchSchema: MongooseSchema<TournamentMatch, import("mongoose").Model<TournamentMatch, any, any, any, any, any, TournamentMatch>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TournamentMatch, Document<unknown, {}, TournamentMatch, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TournamentMatch & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    tournamentId?: import("mongoose").SchemaDefinitionProperty<string, TournamentMatch, Document<unknown, {}, TournamentMatch, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TournamentMatch & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    round?: import("mongoose").SchemaDefinitionProperty<number, TournamentMatch, Document<unknown, {}, TournamentMatch, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TournamentMatch & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    matchNumber?: import("mongoose").SchemaDefinitionProperty<number, TournamentMatch, Document<unknown, {}, TournamentMatch, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TournamentMatch & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    entrant1Id?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, TournamentMatch, Document<unknown, {}, TournamentMatch, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TournamentMatch & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    entrant2Id?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, TournamentMatch, Document<unknown, {}, TournamentMatch, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TournamentMatch & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    winnerId?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, TournamentMatch, Document<unknown, {}, TournamentMatch, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TournamentMatch & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    score?: import("mongoose").SchemaDefinitionProperty<any, TournamentMatch, Document<unknown, {}, TournamentMatch, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TournamentMatch & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, TournamentMatch, Document<unknown, {}, TournamentMatch, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TournamentMatch & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    courtId?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, TournamentMatch, Document<unknown, {}, TournamentMatch, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TournamentMatch & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    umpireId?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, TournamentMatch, Document<unknown, {}, TournamentMatch, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TournamentMatch & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    nextMatchId?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, TournamentMatch, Document<unknown, {}, TournamentMatch, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TournamentMatch & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, TournamentMatch>;
