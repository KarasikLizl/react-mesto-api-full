//Информация пользователя
export const profileName = document.querySelector(".profile__title");
export const profileJob = document.querySelector(".profile__subtitle");
export const profileAvatar = document.querySelector(".profile__avatar");
//Контейнер
export const initialContainerSelector = ".cards";
//Кнопки инициации попапов
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const photoAddButton = document.querySelector(".profile__add-button");
export const avatarEditButton = document.querySelector(".profile__avatar");
//Попапы
export const popupProfileSelector = ".popup_profile";
export const popupProfile = document.querySelector(popupProfileSelector);
export const popupPhotoSelector = ".popup_photo_add";
export const popupPhoto = document.querySelector(popupPhotoSelector);
export const popupPhotoOpenedSelector = ".popup_photo_opened";
export const popupPhotoOpened = document.querySelector(
  popupPhotoOpenedSelector
);
export const popupConfirmDeleteSelector = ".popup_photo_delete";
export const popupAvatarSelector = ".popup_edit-avatar";
export const popupAvatar = document.querySelector(popupAvatarSelector);
// Форма попапа для профиля
export const formUser = popupProfile.querySelector(".form_profile");
// Форма попапа для фотокарточек
export const formAddPhoto = popupPhoto.querySelector(".form_photo");
//Форма попапа для изменения аватара
export const formAvatar = popupAvatar.querySelector(".form_avatar");
// Открытие фотокарточек
export const fullPhotoSelector = ".popup__big-photo";
export const fullPhotoSubtitleSelector = ".popup__subtitle";

export const objectValidation = {
  inputElement: ".form__input",
  buttonElement: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_invalid",
  inputErrorClass: "form__input_type_error",
  errorElement: "form__input-error_active",
};
