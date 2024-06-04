import { promises as fs } from "fs";
import path from "path";
import { list, film } from "../types";

const generateLists = async () => {
    const dataPath = "../data/lists";
    const lists = [];
    const films = [];

    const data = await fs.readFile(path.resolve(dataPath + "/list_order.txt"), "utf-8");

    const listOrder = JSON.parse(data);

    for (const listName of listOrder.order) {
        const filePath = dataPath + "/" + listName;

        const fileNames = await fs.readdir(path.resolve(filePath));
        const list: list = {
            title: "",
            description: "",
            contents: []
        }

        for (const fileName of fileNames) {
            if (fileName === "list_info.txt") {
                const data = await fs.readFile(filePath + "/" + fileName, "utf-8")
                const listInfo = JSON.parse(data);

                list.title = listInfo.title;
                list.description = listInfo.description;
            }
            else {
                const data = await fs.readFile(`${filePath}/${fileName}/film_info.txt`, "utf-8");
                const filmInfo = JSON.parse(data);
                filmInfo.location = `${filePath}/${fileName}`;

                list.contents.push(filmInfo);
                films.push(filmInfo);
            }
        }

        lists.push(list);
    }

    return { lists, films };
}


export const getLists = async (): Promise<list[]> => {
    const { lists } = await generateLists();

    return lists;
}

export const getFilm = async (id): Promise<film> => {
    const { films } = await generateLists();

    const film: film = films.find(film => film.id === id);

    return film;
}

export const getFilmFile = async (id) => {
    const film = await getFilm(id);

    const fileNames = await fs.readdir(path.resolve(film.location));

    for (const fileName of fileNames) {
        if (fileName.includes(".mp4")) {
            const file = await fs.readFile(path.resolve(film.location + "/" + fileName));
            return file;
        }
    }
}