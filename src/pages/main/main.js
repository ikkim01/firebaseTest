import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { firestore } from "../../api/firebase";
import DetailLayout from "../../components/DetailLayout";
import ListLayout from "../../components/ListLayout";
import "./main.scss";

const Main = () => {
  // const [dramaDatabase, setDramaDateBase] = useState([]);
  // const [movieDatabase, setMovieDataBase] = useState([]);

  // const [dramaFilter, setDramaFilter] = useState("");
  // const [movieFilter, setMovieFilter] = useState("");

  // useEffect(() => {
  //   setDramaDateBase([]);
  //   const koreanDrama = firestore.collection("Korean Drama");
  //   dramaFilter
  //     ? koreanDrama
  //         .where("Genre", "array-contains", `${dramaFilter}`)
  //         .get()
  //         .then((docs) => {
  //           docs.forEach((doc) =>
  //             setDramaDateBase((drama) => [...drama, doc.data()])
  //           );
  //         })
  //     : koreanDrama.get().then((docs) => {
  //         docs.forEach((doc) =>
  //           setDramaDateBase((drama) => [...drama, doc.data()])
  //         );
  //       });
  // }, [dramaFilter]);

  // useEffect(() => {
  //   setMovieDataBase([]);
  //   const HollyWoodMovie = firestore.collection("HollyWoodMovie");
  //   movieFilter
  //     ? HollyWoodMovie.where("Genre", "array-contains", `${movieFilter}`)
  //         .get()
  //         .then((docs) => {
  //           docs.forEach((doc) =>
  //             setMovieDataBase((movie) => [...movie, doc.data()])
  //           );
  //         })
  //     : HollyWoodMovie.get().then((docs) => {
  //         docs.forEach((doc) =>
  //           setMovieDataBase((movie) => [...movie, doc.data()])
  //         );
  //       });
  // }, [movieFilter]);
  const [movieList, setMovieList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [filter1, setFilter1] = useState([]);
  const [filter2, setFilter2] = useState([]);
  const [filter3, setFilter3] = useState([]);
  const [highViewsSeries, setHighViewsSeries] = useState([]);
  const [highViewsMovie, setHighViewsMovie] = useState([]);
  const [param, setParam] = useState("");
  const [videoDetail, setVideoDetail] = useState({});
  const location = useLocation();

  const params = location.search.slice(
    location.search.indexOf("?") + 1,
    location.search.length
  );

  useEffect(() => {
    setParam(params);
  }, [params]);

  //영화 필터
  useEffect(() => {
    setMovieList([]);
    const list = firestore.collection("Video");

    list
      .where("Type", "==", "Movie")
      .get()
      .then((docs) => {
        docs.forEach((doc) => setMovieList((movie) => [...movie, doc.data()]));
      });
  }, []);

  //드라마 필터
  useEffect(() => {
    setSeriesList([]);
    const list = firestore.collection("Video");

    list
      .where("Type", "==", "Series")
      .get()
      .then((docs) => {
        docs.forEach((doc) =>
          setSeriesList((series) => [...series, doc.data()])
        );
      });
  }, []);

  //유저 정보를 넣어 필터기능 동작
  useEffect(() => {
    setFilter1([]);
    const list = firestore.collection("Video");

    list
      .where("Genre", "array-contains", `${userInfo[0]}`)
      .get()
      .then((docs) => {
        docs.forEach((doc) => setFilter1((Video) => [...Video, doc.data()]));
      });
  }, []);

  useEffect(() => {
    setFilter2([]);
    const list = firestore.collection("Video");

    list
      .where("Genre", "array-contains", `${userInfo[1]}`)
      .get()
      .then((docs) => {
        docs.forEach((doc) => setFilter2((Video) => [...Video, doc.data()]));
      });
  }, []);

  useEffect(() => {
    setFilter3([]);
    const list = firestore.collection("Video");

    list
      .where("Genre", "array-contains", `${userInfo[2]}`)
      .get()
      .then((docs) => {
        docs.forEach((doc) => setFilter3((Video) => [...Video, doc.data()]));
      });
  }, []);

  useEffect(() => {
    param
      ? firestore
          .collection("Video")
          .doc(`${param}`)
          .get()
          .then((info) => {
            setVideoDetail(info.data());
          })
      : setVideoDetail("");
  }, [param]);

  useEffect(() => {
    setHighViewsMovie([]);
    const list = firestore.collection("Video");

    list
      .where("Views", ">", 10000000)
      .where("Type", "==", "Movie")
      .orderBy("Views", "desc")
      .get()
      .then((docs) => {
        docs.forEach((doc) =>
          setHighViewsMovie((movie) => [...movie, doc.data()])
        );
      });
  }, []);

  useEffect(() => {
    setHighViewsSeries([]);
    const list = firestore.collection("Video");

    list
      .where("Type", "==", "Series")
      .orderBy("Views", "desc")
      .limit(5)
      .get()
      .then((docs) => {
        docs.forEach((doc) =>
          setHighViewsSeries((series) => [...series, doc.data()])
        );
      });
  }, []);

  if (movieList.length === 0) return <>Loading...</>;

  return Object.keys(videoDetail).length !== 0 ? (
    <DetailLayout dataBase={videoDetail} param={param} />
  ) : (
    <>
      <div className="header">
        <h1>시리즈</h1>
        <ListLayout dataBase={seriesList} />
      </div>
      <div className="header">
        <h1>영화</h1>
        <ListLayout dataBase={movieList} />
      </div>
      <div className="header">
        <h1>1000만관객 이상 영화</h1>
        <ListLayout dataBase={highViewsMovie} />
      </div>
      <div className="header">
        <h1>Top5 시리즈</h1>
        <ListLayout dataBase={highViewsSeries} />
      </div>
      <div className="header">
        <h1>고객님을 위한 추천({userInfo[0]})</h1>
        <ListLayout dataBase={filter1} />
      </div>
      <div className="header">
        <h1>고객님을 위한 추천({userInfo[1]})</h1>
        <ListLayout dataBase={filter2} />
      </div>
      <div className="header">
        <h1>고객님을 위한 추천({userInfo[2]})</h1>
        <ListLayout dataBase={filter3} />
      </div>
    </>
  );
};
const userInfo = ["스릴러 영화", "액션&어드벤처", "로맨틱 코미디 시리즈"];

export default Main;
