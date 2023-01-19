import "../index.css";
import CurrentUserContext from "../../src/contexts/CurrentUserContext";
import React, { useContext } from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  //Удаление
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "" : "card__delete-button_disabled"
  }`;
  //Лайки
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  function handleLikeClick () {
    onCardLike(card);
  };

  function handleDeleteClick () {
    onCardDelete(card);
  };

  return (
    <li className="card">
      <div
        className="card__pointer"
        onClick={() => {
          onCardClick(card);
        }}
      >
        <img className="card__image" alt={card.name} src={card.link} />
      </div>
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}/>
      <div className="card__caption">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-section">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          />
          <div className="card__like-number">{card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
