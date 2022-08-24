import React from "react";
import { useNavigate } from "react-router-dom";
import "./ListLayout.scss";

const ListLayout = ({ dataBase }) => {
  const navigate = useNavigate();
  return (
    <div className="box">
      {dataBase.map((data, idx) => {
        const { Name, Image, Top10, Director } = data;

        return (
          <div className="content" key={idx}>
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
          </div>
        );
      })}
    </div>
  );
};

export default ListLayout;
