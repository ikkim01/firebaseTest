import React from "react";
import { useNavigate } from "react-router-dom";
import "./ListLayout.scss";

const ListLayout = ({ dataBase, setParam }) => {
  const navigate = useNavigate();

  return (
    <div className="box">
      {dataBase.map((data, idx) => {
        const { Id, Name, Img } = data;

        return (
          <div className="content" key={idx} onClick={() => navigate(`?${Id}`)}>
            <div className="imgbox">
              <img src={`${Img}`} alt={`${Name}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListLayout;
