const { API_URL } = process.env;

export const getListsRequest = async () => {
    return fetch(`${API_URL}/api/lists`);
};

export const getFilmInfoRequest = async (id: number) => {
    return fetch(`${API_URL}/api/film?id=${id}`);
}

export const getVideoFileRequest = async (id: number) => {
    return fetch(`${API_URL}/api/film/file?id=${id}`);
}