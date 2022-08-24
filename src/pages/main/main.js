import React, { useState, useEffect } from "react";
import { firestore } from "../../api/firebase";
import ListLayout from "../../components/ListLayout";

const Main = () => {
  const [dramaDatabase, setDramaDateBase] = useState([]);
  const [movieDatabase, setMovieDataBase] = useState([]);

  useEffect(() => {
    setDramaDateBase([]);
    const koreanDrama = firestore.collection("Korean Drama");

    koreanDrama.get().then((docs) => {
      docs.forEach((doc) =>
        setDramaDateBase((drama) => [...drama, doc.data()])
      );
    });
  }, []);

  useEffect(() => {
    setMovieDataBase([]);
    const koreanDrama = firestore.collection("HollyWoodMovie");

    koreanDrama.get().then((docs) => {
      docs.forEach((doc) =>
        setMovieDataBase((movie) => [...movie, doc.data()])
      );
    });
  }, []);

  if (dramaDatabase.length === 0) return <>Loading...</>;

  console.log(dramaDatabase);
  console.log(movieDatabase);
  return (
    <div>
      <ListLayout dataBase={dramaDatabase} />
      <ListLayout dataBase={movieDatabase} />
    </div>
  );
};

export default Main;
