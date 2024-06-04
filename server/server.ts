import express from "express";
import { getFilm, getLists, getFilmFile } from "./lists";
import { list } from "../types";

export const startServer = () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("dist-web"));

    app.get("/api", (req, res) => {
        res.send("hi there whats up");
    })

    app.get("/api/lists", async (req, res) => {
        const lists: list[] = await getLists();

        res.send({
            success: true,
            lists
        });
    })

    type filmRequest = Record<string, any> & {
        query: {
            id: string;
        }
    }

    app.get("/api/film", async (req: filmRequest, res) => {
        const id = parseInt(req.query.id);

        const film = await getFilm(id);

        if (film) {
            res.send({
                success: true,
                ...film
            })
        }
        else {
            res.send({
                success: false,
                message: "No film found with that id"
            })
        }
    })

    app.get("/api/film/file", async (req: filmRequest, res) => {
        const id = parseInt(req.query.id);

        const film = await getFilmFile(id);

        res.send(film);
    })

    app.listen(8383);
}