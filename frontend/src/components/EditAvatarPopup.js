import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const avatarRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name="avatar"
      heading="Обновить аватар"
      submit={onLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          className="popup__input"
          name="avatar"
          type="url"
          id="avatar-link"
          placeholder="Ссылка на картинку"
          ref={avatarRef}
          required />
        <span className="popup__error avatar-link-error"></span>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
