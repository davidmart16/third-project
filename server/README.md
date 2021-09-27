# Endpoints

| Metodo | Ruta                 | Descripcion                                                                            |
| ------ | -------------------- | -------------------------------------------------------------------------------------- |
| post   | /auth/login YES      | Inicio de sesion del usuario                                                           |
| post   | /auth/signup YES     | Registro del usuario (como logearse inmediatamente despues de registrarse)             |
| get    | /auth/logout YES     | Cierra la sesion                                                                       |
| post   | /auth/isloggedin YES | Comprueba si hay sesion iniciada                                                       |
| get    | /user YES            | Llama una lista de usuarios                                                            |
| get    | /user/:id YES        | Llama tu perfil y tus audios o fragmentos favoritos                                    |
| put    | /user/my-audios      | Pushear un audio dentro de mis audios.                                                 |
| put    | /user/fav-audios     | Pushear un audio dentro de mis audios favoritos.                                       |
| get    | /book YES            | Llama lista de libros con mas audios, fragmentos con mas audios y audios mejor votados |
| get    | /book/:id YES        | Llama informacion de un libro                                                          |
| get    | /audio YES           | Llama a todos los audios                                                               |
| post   | /audio YES           | Crea/sube un nuevo fragmento                                                           |
| delete | /audio/:id YES       | Elimina un audio                                                                       |
| get    | /comment             | Llama a los comentarios                                                                |
| post   | /comment             | Crea un comentario                                                                     |
| delete | /comment/:id YES     | Elimina un comentario                                                                  |
| get    | /fragment            | Llama a los fragmentos del libro                                                       |
| get    | /fragment/:id        | Muestra los detalles del fragmento con todos los audios                                |
| post   | /fragment            | Crea un fragmento                                                                      |
| delete | /fragment/:id YES    | Elimina un fragmento                                                                   |
| put    | /fragment/:id        | Actualiza un fragmento                                                                 |
