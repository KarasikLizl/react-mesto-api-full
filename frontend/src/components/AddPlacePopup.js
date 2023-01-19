import "../index.css";
import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onCloseEsc, onAddPlace }) {
  const [cardName, setCardName] = useState("");
  const [cardUrl, setCardUrl] = useState("");

  function onSetCardName(event) {
    setCardName(event.target.value);
  }

  function onSetCardUrl(event) {
    setCardUrl(event.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: cardName, link: cardUrl });
    e.target.reset()
  }

  useEffect(()=>{
    if(isOpen) {
      setCardName('');
      setCardUrl('');
    }
  }, [isOpen])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onCloseEsc={onCloseEsc}
      onSubmit={handleAddPlaceSubmit}
      title="Новое место"
      name="photo_add"
      buttonType="submit-button_type_photo"
      buttonName="Создать"
    >
      <input
        onChange={onSetCardName}
        value={cardName || ''}
        type="text"
        id="photo-name"
        placeholder="Название"
        className="form__input form__input_field_title"
        name="name"
        minLength={2}
        maxLength={30}
        required
      />
      <span className="form__input-error photo-name-error" />
      <input
        onChange={onSetCardUrl}
        value={cardUrl || ''}
        type="url"
        id="link"
        placeholder="Ссылка на картинку"
        className="form__input form__input_field_photo"
        name="link"
        required
      />
      <span className="form__input-error link-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
