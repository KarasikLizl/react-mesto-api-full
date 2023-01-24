import '../index.css';
import { useEffect } from 'react';

function PopupWithForm({
  isOpen,
  onClose,
  onCloseEsc,
  title,
  name,
  children,
  buttonType,
  buttonName,
  onSubmit,
}) {
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', onCloseEsc);
    }
    return () => {
      document.removeEventListener('keydown', onCloseEsc);
    };
  }, [isOpen, onCloseEsc]);

  return (
    <div
      className={
        isOpen ? `popup popup_${name} popup_is_opened` : `popup popup_${name}`
      }
    >
      <div className='popup__container'>
        <button
          className={`popup__close-button popup__close-button_type__${name}`}
          type='button'
          onClick={onClose}
        />
        <h3 className='popup__title'>{title}</h3>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(event);
          }}
          method='post'
          name='profile-edit'
          className={`form form_${name}`}
        >
          {children}
          <button
            className={`form__submit-button form__${buttonType}`}
            type='submit'
          >
            {buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
