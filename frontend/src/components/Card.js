import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked ? "element__like-button_active" : ""}`
  );

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card._id);
  };

  return (
    <li className="element" key={card._id}>
      <img
        className="element__image"
        src={card.link}
        onClick={handleClick}
        alt={card.name} />
      {isOwn &&
        <button
          className="element__trash-button"
          type="button"
          onClick={handleDeleteClick}
          aria-label="Удалить"
        />}
      <div className="element__info">
        <h2 className="element__heading">{card.name}</h2>
        <div className="element__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
            aria-label="Лайк"
          />
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
