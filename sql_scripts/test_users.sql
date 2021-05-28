CREATE DATABASE userdb;
USE userdb;
#DROP TABLE User

CREATE TABLE User (
  UserID  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Email         VARCHAR(320)    NOT NULL,
  Login         VARCHAR(30)     NOT NULL,
  PasswordHash  BINARY(64)      NOT NULL,
  LastName      VARCHAR(255)    NOT NULL,
  FirstName     VARCHAR(255)    NOT NULL,
  AuthToken     VARCHAR(255)
); 

#INSERT INTO `User` (`id`, `email`, `password`) VALUES (1, 'asjkdkjas@ksad.com', 'asdadas');