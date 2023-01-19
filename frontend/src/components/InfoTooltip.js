import "../index.css";
import { useEffect } from "react";

function InfoTooltip({isOpen, onClose, onCloseEsc, name, title, checkImage}) {
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", onCloseEsc);
    }
    return () => {
      document.removeEventListener("keydown", onCloseEsc);
    };
  }, [isOpen, onCloseEsc]);

  return (
    <div
      className={
        isOpen ? `popup popup_${name} popup_is_opened` : `popup popup_${name}`
      }
    >
      <div className="popup__container">
        <button
          className="popup__close-button popup__close-button_type__sucsess"
          type="button"
          onClick={()=>{onClose()}}
        />
        <img className="popup__image" src={checkImage} alt="Картинка" />
        <p className="popup__caption">{title}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
