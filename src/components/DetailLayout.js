import React, { useEffect, useState } from "react";
import { firestore } from "../api/firebase";
import "./DetailLayout.scss";

const DetailLayout = ({ dataBase, param }) => {
  const { Type, Img, Genre, Name, Subtitle, Seasons } = dataBase;
  const [seriesData, setSeriesData] = useState([]);
  const [seasonsData, setSeasonsData] = useState(1);

  useEffect(() => {
    setSeriesData([]);
    const list = firestore.collection("Video").doc(`${param}`);

    Type === "Series" &&
      list
        .collection("Episode")
        .get()
        .then((result) => {
          result.forEach((Episode) =>
            setSeriesData((Video) => [...Video, Episode.data()])
          );
        });

    Seasons &&
      list
        .collection("Season")
        .doc(`${seasonsData}`)
        .collection("Episode")
        .get()
        .then((result) => {
          result.forEach((Episode) =>
            setSeriesData((Video) => [...Video, Episode.data()])
          );
        });
  }, [seasonsData]);

  return (
    <div className="detail">
      <div className="imgbox">
        <img src={`${Img}`} alt={Name} />
      </div>
      <div className="textbox">
        <div className="detail-text">
          <p>제목 : {Name}</p>
          <p>장르 : {Genre.map((genre) => `${genre} `)}</p>
          <p>{Subtitle}</p>
        </div>
        {Seasons &&
          [...Array(Seasons)].map((undefined, index) => {
            return (
              <button onClick={() => setSeasonsData(index + 1)}>
                시즌 {index + 1}
              </button>
            );
          })}

        {seriesData.map((episode) => {
          const { Subtitle, Name, Img } = episode;
          return (
            <div className="episode">
              <p>{Img}</p>
              <p>{Name}</p>
              <span>{Subtitle}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailLayout;
