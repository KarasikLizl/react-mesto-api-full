import "../index.css";
import { useEffect } from "react";

function ImagePopup({ card, onClose, onCloseEsc, isOpen }) {
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
      className={`popup popup_photo_opened popup_background_dark ${
        card.name ? "popup_is_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_photo_opened">
        <figure className="popup__figure">
          <button
            className="popup__close-button popup__close-button_type_photo"
            type="button"
            onClick={() => {
              onClose();
            }}
          />
          <img className="popup__big-photo" src={card.link} alt={card.name} />
          <figcaption className="popup__subtitle">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
