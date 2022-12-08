import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateUser({
      name: enteredValues.name,
      about: enteredValues.about
    });
  };

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [resetForm, isOpen, currentUser]);

  return (
    <PopupWithForm
      name="edit-profile"
      heading="Редактировать профиль"
      submit={onLoading ? "Сохранение..." : "Сохранить"}
      stateSubmitButton={!isFormValid}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          className="popup__input"
          name="name"
          id="name"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={enteredValues.name || ''}
          onChange={handleChange}
          required />
        {errors.name && (
        <span className="popup__error name-error">{errors.name}</span>
        )}
        <input
          className="popup__input"
          name="about"
          id="about"
          type="text"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          value={enteredValues.about || ''}
          onChange={handleChange}
          required />
        {errors.about && (
        <span className="popup__error description-error">{errors.about}</span>
        )}
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
