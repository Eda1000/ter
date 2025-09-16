import { useState } from "react";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import boxImg from "../../assets/box/box2.png";

const Box = () => {
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

  const handleSelect = () => {
    setSelected(true);
    toast.success("Caixa selecionada com sucesso!");
  };

  const handleNext = () => {
    if (selected) {
      navigate("/home"); // Ajuste a rota para onde deseja redirecionar
    } else {
      toast.error("Selecione uma caixa antes de continuar!");
    }
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
};

export default Box;
