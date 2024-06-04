export type film = {
    title: string;
    description: string;
    id: number;
    location: string;
};

export type list = {
    title: string;
    description: string;
    contents: film[];
};