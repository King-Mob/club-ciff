import "../styles/app.css";
import React, { useEffect, useState } from "react";
import { getListsRequest, getThumbnailFileRequest } from "../requests";
import { list } from "../../types";

const Thumbnail = ({ id }) => {
  const [thumbnailSrc, setThumbnailSrc] = useState("");

  const loadThumbnailFile = async () => {
    const thumbnailResponse = await getThumbnailFileRequest(id);
    const thumbnailBlob = await thumbnailResponse.blob();

    if (thumbnailBlob.size > 0) {
      const thumbnailFile = new File([thumbnailBlob], "thumbnail.jpg", {
        type: "image/jpg",
      });
      const thumbnailUrl = URL.createObjectURL(thumbnailFile);

      setThumbnailSrc(thumbnailUrl);
    }
  };

  useEffect(() => {
    loadThumbnailFile();
  }, []);

  const src = thumbnailSrc || require("../images/default-thumbnail.jpg");

  return <img className="thumbnail" src={src} />;
};

const Home = () => {
  const [lists, setLists] = useState<list[]>([]);

  const getLists = async () => {
    const listResponse = await getListsRequest();
    const { lists } = await listResponse.json();

    setLists(lists);
  };

  useEffect(() => {
    getLists();
  }, []);

  const selectFilm = (id: number) => {
    window.location.href = `./?filmId=${id}`;
  };

  return (
    <>
      <h1>Club Ciff</h1>
      <p>The coolest club for all the groovy cats</p>
      <div id="lists-container">
        {lists.map((list) => (
          <div className="list-container">
            <h2>{list.title}</h2>
            <p>{list.description}</p>
            <div className="films-container">
              {list.contents.map((film) => (
                <div
                  className="film-container"
                  onClick={() => selectFilm(film.id)}
                >
                  <h3>{film.title}</h3>
                  <Thumbnail id={film.id} />
                  <p>{film.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <footer>
        <p>Club Ciff is brought to you by the good people at Blake House</p>
      </footer>
    </>
  );
};

export default Home;
