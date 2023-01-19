import "../index.css";
import React, { useContext } from "react";
import Footer from "../components/Footer";
import Card from "./Card";
import CurrentUserContext from "../../src/contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__user">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          >
            <div className=" profile__overlay" onClick={onEditAvatar} />
          </div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="cards">
          {cards.map((item) => {
            return (
              <Card card={item} onCardClick={onCardClick} key={item._id} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
            );
          })}
        </ul>
      </section>
      <Footer />
    </main>
  );
}

export default Main;
