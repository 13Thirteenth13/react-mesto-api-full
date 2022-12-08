import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_view-image ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          />
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__figcaption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
