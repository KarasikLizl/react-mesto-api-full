import userSchema from "../models/user.js";

export const getUsers = (res) => {
  userSchema
    .find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
        res.status(500).send({ message: "Ошибка на сервере" });
    });
};

export const getUserById = (req, res) => {
  userSchema
    .findById(req.params.userId)
    .orFail(() => {
      return res
        .status(404)
        .send({ message: "Пользователь с указанным id не найден" });
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
        res.status(500).send({ message: "Ошибка на сервере" });
    });
};

export const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userSchema
    .create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
        res.status(500).send({ message: "Ошибка на сервере" });
    });
};

export const updateProfile = (req, res) => {
  const { name, about } = req.body;
  userSchema
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    )
    .orFail(() => res.status(404).send({ message: "Пользователь не найден" }))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        return res.status(400).send({ message: "Неверные данные" });
      } else {
        res.status(500).send({ message: "Ошибка на сервере" });
      }
    })

};

export const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  userSchema
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    )
    .orFail(() => res.status(404).send({ message: "Пользователь не найден" }))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Неверные данные" });
      } else if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Вставьте корректную ссылку" });
      } else {
        res.status(500).send({ message: "Ошибка на сервере" });
      }
    })
};
