import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddPlace({
      name: enteredValues.title,
      link: enteredValues.link
    });
  };

  useEffect(() => {
    resetForm()
  }, [resetForm, isOpen]);

  return (
    <PopupWithForm
      name="new-element"
      heading="Новое место"
      submit={onLoading ? "Создание..." : "Создать"}
      stateSubmitButton={!isFormValid}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          className="popup__input"
          name="title"
          type="text"
          id="title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={enteredValues.title || ""}
          required />
        {errors.title && <span className="popup__error title-error">{errors.title}</span>}
        <input
          className="popup__input"
          name="link"
          id="link"
          type="url"
          placeholder="Ссылка на картинку"
          onChange={handleChange}
          value={enteredValues.link || ""}
          required />
        {errors.link && <span className="popup__error link-error">{errors.link}</span>}
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
