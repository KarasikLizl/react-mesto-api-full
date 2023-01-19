import "../index.css";
import { useState, useEffect, useCallback } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";

import Header from "../components/Header";
import Main from "../components/Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";

import api from "../utils/Api";
import { register, authorize, checkToken } from "../utils/auth";
import CurrentUserContext from "../../src/contexts/CurrentUserContext";

import Login from "./Login";
import Register from "./Register";

import popupFail from "../images/popup-fail.svg";
import popupSucsess from "../images/popup-sucsess.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isInfoToolTipOpened, setInfoToolTipOpened] = useState({
    opened: false,
    text: "",
    statusImage: "",
  });

  const [selectedCard, setSelectedCard] = useState({});
  const [isSelectedCardOpen, setIsSelectedCardOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((currentUser) => {
          setCurrentUser(currentUser);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsSelectedCardOpen(!isSelectedCardOpen);
  }
  //Редактирование профиля
  function handleUpdateUser(userInfo) {
    api
      .editUserInfo(userInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(userAvatar) {
    api
      .editAvatar(userAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  //Взаимодействие с карточками
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => {
            return c._id !== card._id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
    setIsSelectedCardOpen(false);
    setInfoToolTipOpened({ opened: false, text: "", statusImage: "" });
  }

  function closeOnEsc(event) {
    if (event.key === "Escape") {
      closeAllPopups();
    }
  }

  //Авторизация
  const onSignIn = (email, password) => {
    authorize(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("token", res.token);
          history.push("/");
          setUserEmail(email);
        } else {
          throw new Error("Что-то пошло не так");
        }
      })
      .catch(() => {
        setInfoToolTipOpened({
          opened: true,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          statusImage: popupFail,
        });
      });
  };

  //Регистрация
  const onSignUp = (email, password) => {
    register(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          history.push("/sign-in");
          setInfoToolTipOpened({
            opened: true,
            text: "Вы успешно зарегистрировались!",
            statusImage: popupSucsess,
          });
        } else {
          throw new Error("Что-то пошло не так");
        }
      })
      .catch(() =>
        setInfoToolTipOpened({
          opened: true,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          statusImage: popupFail,
        })
      );
  };

  // Токен
  const onCheckToken = useCallback(() => {
    checkToken(localStorage.getItem("token"))
      .then((res) => {
        if (res) {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          history.push("/");
        } else {
          throw new Error("Вам нужно авторизоваться");
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        history.push("/sign-in");
      });
  }, [history]);

  useEffect(() => {
    onCheckToken();
  }, [onCheckToken]);

  const handleOnLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    setUserEmail("");
    history.push("/sign-in");
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userEmail={userEmail} onLogout={handleOnLogout} />
        <Switch>
          <ProtectedRoute
            loggedIn={loggedIn}
            exact
            path="/"
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          ></ProtectedRoute>

          <Route path="/sign-up">
            <Register onSignUp={onSignUp} />
          </Route>
          <Route path="/sign-in">
            <Login onSignIn={onSignIn} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <div id="card-template" />

        {/* попап редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onCloseEsc={closeOnEsc}
        />

        {/* попап нового аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onCloseEsc={closeOnEsc}
        />

        {/* попап добавления картинки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCloseEsc={closeOnEsc}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* попап подтверждения удаление */}
        <PopupWithForm
          isOpen={isConfirmationPopupOpen}
          onCloseEsc={closeOnEsc}
          title="Вы уверены?"
          name="photo_delete"
          buttonType="confirm-button"
          buttonName="Да"
        ></PopupWithForm>

        {/* попап картинки */}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onCloseEsc={closeOnEsc}
          isOpen={isSelectedCardOpen}
        />

        {/* попап регистрации*/}
        <InfoTooltip
          isOpen={isInfoToolTipOpened.opened}
          onClose={() => closeAllPopups()}
          onCloseEsc={closeOnEsc}
          name={"status"}
          title={isInfoToolTipOpened.text}
          checkImage={isInfoToolTipOpened.statusImage}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
