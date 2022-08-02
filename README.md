# Backend дипломного проекта Movie Explorer

## Ссылка на проект: https://linkova.movie.back.nomoredomains.xyz/

### Stack

Node.js + Express.js, MongoDB

Бэкенд для дипломной работы. Каталог фильмов, которые можно сохранить к себе в избранное.

GET /users/me - возвращает информацию о пользователе (email и имя)  
PATCH /users/me - обновляет информацию о пользователе (email и имя)  
GET /movies - возвращает все сохранённые пользователем фильмы  
POST /movies - создаёт фильм
DELETE /movies/movieId - удаляет сохранённый фильм

POST /signup - создаёт пользователя  
POST /signin - проверяет переданные в теле почту и пароль и возвращает JWT

- Авторизация реализована при получении JWT token и хранении его в localStorage (jsonwebtoken)
- Пароль хранится в виде hash (bcrypt)
- Кроссдоменные запросы регулируются CORS (cors)
- Реализована backend validation (joi, celebrate)
- Реализована централизованная обработка ошибок. При любой ошибке API возвращается понятный ответ. Все обработчики завершаются catch
- Реализовано логирование (winston)
- Установлено ограничение на кол-во запросов с одного IP (express-rate-limit)
- Для работы с MongoDB используется mongoose
- Бэкенд задеплоен на виртуальный сервер cloud.yandex.ru . ОС - Ubuntu 20.04. Был настроен nginx, выпущены сертификаты SSL, настроени перезапуск сервера.

# Backend Movie Explorer

Final project with Yandex.Practicum

### Stack

Node.js + Express.js, MongoDB

## Description

It presents:

Backendf the application with the following features: authorization and registration of users, operations with searching for films on a third-party api, adding them to favorites and updating user data.

Endpoints:

- GET /users/me
- PATCH /users/me
- GET /movies
- POST /movies
- DELETE /movies/movieId

- POST /signup
- POST /signin

---

- [Link](https://linkova.movie.front.nomoredomains.xyz) to the frontend;
- Backend requests at [address](https://linkova.movie.back.nomoredomains.xyz);
