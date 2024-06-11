import React, { useEffect, useState } from "react";
import { getFilmInfoRequest, getVideoFileRequest } from "../requests";

const Film = ({ id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoSource, setVideoSource] = useState("");

  const loadFilmInfo = async () => {
    const filmResponse = await getFilmInfoRequest(id);
    const { title, description } = await filmResponse.json();

    setTitle(title);
    setDescription(description);
  };

  const loadFilmFile = async () => {
    const videoResponse = await getVideoFileRequest(id);
    const videoBlob = await videoResponse.blob();

    const videoFile = new File([videoBlob], "demo.mp4", { type: "video/mp4" });
    const videoUrl = URL.createObjectURL(videoFile);

    setVideoSource(videoUrl);
  };

  useEffect(() => {
    loadFilmInfo();
    loadFilmFile();
  }, []);

  return (
    <div>
      <p>
        <a href="./">back</a>
      </p>
      <h1>{title}</h1>
      <p>{description}</p>
      {videoSource && (
        <div id="video-container">
          <video controls>
            <source src={videoSource} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
};

export default Film;
