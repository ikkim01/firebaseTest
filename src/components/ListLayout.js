import React from "react";
import "./ListLayout.scss";

const ListLayout = ({ dataBase }) => {
  console.log(dataBase);
  return (
    <div className="box">
      {dataBase.map((data) => {
        const {
          Name,
          Actor,
          Age,
          Episode,
          Genre,
          Image,
          Release,
          SubTitle,
          Top10,
          Director,
          Minute,
        } = data;
        const date = new Date(Release).getFullYear();
        return (
          <div className="content">
            <h1>{Name}</h1>
            {Director && <p>감독 : {Director}</p>}
            <p>출연 : {Actor.map((actor) => `${actor} `)}</p>
            <p>시청 연령 : {Age} 세이상 시청</p>
            {Episode && <p>에피소드 {Episode}개</p>}
            <p>장르 : {Genre.map((genre) => `${genre} `)}</p>
            <div className="imgbox">
              <img src={`${Image}`} alt={`${Name}`} />
              {Top10 === true && (
                <p>
                  Top
                  <br />
                  10
                </p>
              )}
            </div>
            {Minute && <p>상영시간 : {Minute}분</p>}
            <p>{date}</p>
            <p>{SubTitle}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ListLayout;
