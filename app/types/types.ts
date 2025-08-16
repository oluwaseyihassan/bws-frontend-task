export type FixturesResponse = {
    status: "success" | "error";
    data?: {
        data: Fixtures[] | null;
        pagination: Pagination;
    };
    message: string;
    error?: string;
} | null

export interface Fixtures {
    id: number;
    league_id: number;
    name: string;
    starting_at: string;
    result_info: string;
    league: League;
    predictions: Array<{
        id: number;
        fixture_id: number;
        predictions: {
            home: number;
            away: number;
            draw: number;
        }
        type_id: number;
        type: Type;
    }> | null | [];
    participants: Array<{
        id: number;
        name: string;
        image_path: string;
        meta: {
            location: string;
            winner: boolean;
        }
    }> ;
    scores: Scores[] | [];
    state: State;
}

export interface Type {
    id: number;
    name: string;
    code: string;
    developer_name: string;
}

export interface Pagination {
    count: number;
    per_page: number;
    current_page: number;
    next_page: string | null;
    has_more: boolean;
}

export interface Participants {
    id: number;
    name: string;
    image_path: string;
    meta: {
        location: string;
        winner: boolean | null;
    }
}

export interface League {
    id: number;
    name: string;
    image_path: string;
    country: Country;
}

export interface Country {
    id: number;
    name: string;
    image_path: string | null;
}

export interface Scores {
    id: number;
    fixture_id: number;
    participant_id: number;
    type_id: number;
    score: {
        goals: number;
        participant: string;
    };
    type: Type;
}

export interface State {
    id: number;
    state: string;
    name: string;
    developer_name: string;
}