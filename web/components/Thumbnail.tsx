import React, { useState, useEffect } from "react";
import { getThumbnailFileRequest } from "../requests";

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

export default Thumbnail;
