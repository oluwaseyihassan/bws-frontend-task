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
        type: {
            id: number;
            name: string;
            code: string;
            developer_name: string;
        }
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