import React, { useState, useEffect, lazy } from "react";
import { firestore } from "../../api/firebase";
import ListLayout from "../../components/ListLayout";
import "./main.scss";

const Main = () => {
  const [dramaDatabase, setDramaDateBase] = useState([]);
  const [movieDatabase, setMovieDataBase] = useState([]);

  const [dramaFilter, setDramaFilter] = useState("");
  const [movieFilter, setMovieFilter] = useState("");

  useEffect(() => {
    setDramaDateBase([]);
    const koreanDrama = firestore.collection("Korean Drama");
    dramaFilter
      ? koreanDrama
          .where("Genre", "array-contains", `${dramaFilter}`)
          .get()
          .then((docs) => {
            docs.forEach((doc) =>
              setDramaDateBase((drama) => [...drama, doc.data()])
            );
          })
      : koreanDrama.get().then((docs) => {
          docs.forEach((doc) =>
            setDramaDateBase((drama) => [...drama, doc.data()])
          );
        });
  }, [dramaFilter]);

  useEffect(() => {
    setMovieDataBase([]);
    const HollyWoodMovie = firestore.collection("HollyWoodMovie");
    movieFilter
      ? HollyWoodMovie.where("Genre", "array-contains", `${movieFilter}`)
          .get()
          .then((docs) => {
            docs.forEach((doc) =>
              setMovieDataBase((movie) => [...movie, doc.data()])
            );
          })
      : HollyWoodMovie.get().then((docs) => {
          docs.forEach((doc) =>
            setMovieDataBase((movie) => [...movie, doc.data()])
          );
        });
  }, [movieFilter]);

  return (
    <>
      <div className="header">
        <h1>한국 드라마{dramaFilter && `중 ${dramaFilter}`}</h1>
        <div className="button-box">
          <button onClick={() => setDramaFilter("")}>전체보기</button>
          <button onClick={() => setDramaFilter("스릴러 시리즈")}>
            스릴러 시리즈
          </button>
          <button onClick={() => setDramaFilter("범죄 시리즈")}>
            범죄 시리즈
          </button>
        </div>
        <ListLayout dataBase={dramaDatabase} />
      </div>
      <div className="header">
        <h1>할리우드 영화{movieFilter && `중 ${movieFilter}`}</h1>
        <div className="button-box">
          <button onClick={() => setMovieFilter("")}>전체보기</button>
          <button onClick={() => setMovieFilter("SF 영화")}>SF 영화</button>
          <button onClick={() => setMovieFilter("호러 영화")}>호러 영화</button>
        </div>
        <ListLayout dataBase={movieDatabase} />
      </div>
    </>
  );
};

export default Main;
