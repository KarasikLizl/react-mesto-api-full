import "../index.css";
import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onCloseEsc }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(()=>{
    if(isOpen) {
      avatarRef.current.value = '';
    }
  }, [isOpen])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onCloseEsc={onCloseEsc}
      onSubmit={handleSubmit}
      title="Обновить аватар?"
      name="edit-avatar"
      buttonType="submit-button_type_avatar"
      buttonName="Сохранить"
    >
      <input
        ref={avatarRef}
        type="url"
        id="avatar"
        placeholder="Ссылка на картинку"
        className="form__input form__input_field_photo"
        name="avatar"
        required
      />
      <span className="form__input-error avatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;