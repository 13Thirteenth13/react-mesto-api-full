import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

import * as auth from "../utils/auth";
import api from "../utils/api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(false);
  const [authorizationEmail, setAuthorizationEmail] = useState('');

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
    email: "",
  });
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    handleTokenCheck();
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser({ ...currentUser, ...user });
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
    }
  }, [isLoggedIn]);

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    auth
      .getContent(jwt)
      .then(({ email }) => {
        api.setHeadersAuth(jwt);
        setAuthorizationEmail(email);
        setIsLoggedIn(true);
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleInfoTooltip = () => {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  };

  const handleCardClick = card => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((likeId) => likeId === currentUser._id);
    api.toggleLikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  const handleCardDelete = (cardId) => {
    api.deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter(card => card._id !== cardId));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  const handleUpdateUser = (newUserInfo) => {
    setIsLoading(true);
    api.setUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api.setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const handleAddPlaceSubmit = (newData) => {
    setIsLoading(true);
    api.addCard(newData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  };

  const handleRegistration = (data) => {
    return auth
      .register(data)
      .then(() => {
        setIsRegistrationSuccessful(true);
        handleInfoTooltip();
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccessful(false);
        handleInfoTooltip();
      });
  };

  const handleAuthorization = (data) => {
    return auth
      .authorize(data)
      .then(({ token }) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', token);
        api.setHeadersAuth(token);
        handleTokenCheck();
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip();
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    api.setHeadersAuth("");
    setIsLoggedIn(false);
    history.push('/sign-in');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={isLoggedIn}
          userEmail={authorizationEmail}
          onSignOut={handleSignOut}
        />

        <Switch>
          <Route path="/sign-in">
            <Login onLogin={handleAuthorization} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegistration} />
          </Route>
          <ProtectedRoute
            path="/"
            component={Main}
            loggedIn={isLoggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>

        <Footer loggedIn={isLoggedIn} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isSuccess={isRegistrationSuccessful}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
