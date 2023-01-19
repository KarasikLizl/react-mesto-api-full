import "../index.css";
import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onCloseEsc }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function onEditProfile(event) {
    setName(event.target.value);
  }

  function onEditDescriprion(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onCloseEsc={onCloseEsc}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="profile"
      buttonType="submit-button_type_profile"
      buttonName="Сохранить"
    >
      <input
        onChange={onEditProfile}
        value={name || ""}
        type="text"
        id="title-input"
        placeholder="Ваше имя"
        className="form__input form__input_field_username"
        name="name"
        minLength={2}
        maxLength={40}
        required
      />
      <span className="form__input-error title-input-error" />
      <input
        onChange={onEditDescriprion}
        value={description || ""}
        type="text"
        id="subtitle-input"
        placeholder="Пара слов о вас"
        className="form__input form__input_field_job"
        name="about"
        minLength={2}
        maxLength={200}
        required
      />
      <span className="form__input-error subtitle-input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;