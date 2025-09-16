import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import boxImg from "../../assets/box/box2.png";

function Box() {
  const [selected, setSelected] = useState(false);
  const history = useHistory();

  const handleSelect = () => {
    setSelected(true);
    toast.success("Caixa selecionada!");
  };

  const handleNext = () => {
    history.push("/home");
  };

  return (
    <div className="box-container">
      <img src={boxImg} alt="Box" className="box-img" />
      <button onClick={handleSelect} className="btn-select">
        <FaCheck /> Selecionar
      </button>
      <button onClick={handleNext} className="btn-next">
        Próximo
      </button>
    </div>
  );
}

export default Box;
