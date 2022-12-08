import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
          aria-label="Закрыть"
        />
        <h3 className="popup__heading">{props.heading}</h3>
        <form
          className="popup__form form"
          name={`${props.name}`}
          action="#"
          onSubmit={props.onSubmit}>
          <fieldset className="popup__fieldset">
            {props.children}
            <button
              className={`popup__submit-button ${props.stateSubmitButton ? "popup__submit-button_disabled" : ""}`}
              type="submit"
              disabled={props.stateSubmitButton}
              aria-label={props.submit}>
              {props.submit}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
