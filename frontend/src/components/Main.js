import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <main className="content">
      <section className="profile">
        <img
          className="profile__avatar"
          src={avatar}
          alt="Изображение профиля" />
        <button
          className="profile__edit-avatar-button"
          type="button"
          onClick={onEditAvatar}
          aria-label="Редактировать аватар"
        />
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <p className="profile__description">{about}</p>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
            aria-label="Редактировать профиль"
          />
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
          aria-label="Добавить новую карточку"
        />
      </section>

      <section className="elements">
        <ul className="elements__cards">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>

    </main>
  );
}

export default Main;
