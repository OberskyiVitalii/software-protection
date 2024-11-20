const db = require("../models/database");
const bcrypt = require("bcrypt");

exports.register = (req, res) => {
  const { login, email, password, description } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.get(`SELECT login FROM users WHERE login = ?`, [login], (err, user) => {
    if (err) {
      return res.status(500).send("Помилка сервера під час перевірки логіна.");
    }
    if (user) {
      return res.status(400).send("Користувач із таким логіном вже існує.");
    }

    db.run(
      `INSERT INTO users (login, email, password, description) VALUES (?, ?, ?, ?)`,
      [login, email, hashedPassword, description],
      (err) => {
        if (err) {
          return res.status(500).send("Помилка сервера під час реєстрації.");
        }
        res.send("Реєстрація успішна!");
      }
    );
  });
};

exports.login = (req, res) => {
  const { login, password } = req.body;

  db.get(`SELECT * FROM users WHERE login = ?`, [login], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(400)
        .json({ success: false, message: "Невірний логін або пароль." });
    }
    res.json({ success: true });
  });
};
