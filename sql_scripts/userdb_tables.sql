#CREATE DATABASE userdb;
USE userdb;
#DROP TABLE User

CREATE TABLE user (
  UserID  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Email         VARCHAR(320)    NOT NULL,
  Login         VARCHAR(30)     NOT NULL,
  PasswordHash  BINARY(64)      NOT NULL,
  LastName      VARCHAR(255)    NOT NULL,
  FirstName     VARCHAR(255)    NOT NULL,
  AuthToken     VARCHAR(255)
); 


CREATE TABLE orders (
  ID   INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  CustomerID INT,
  VendorCode INT,
  Quantity INT,
  CreatedAt DATE,
  FOREIGN KEY (CustomerID) REFERENCES user (UserID)
);

CREATE TABLE favorites (
  ID   INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  VendorCode   INT NOT NULL,
  CustomerID   INT NOT NULL,
  FOREIGN KEY (CustomerID) REFERENCES user (UserID)
);

#INSERT INTO `user` (`UserID`, `Email`, `Login`, `PasswordHash`, `LastName`, `FirstName`) VALUES (1, 'testmail@gmail.com', 'Admin', UNHEX('d00723aab895df2dc4df91bede8c0a27be48f71c5051248521f09b5424559521d26d9f80888adbc242cfd3af9ac134d49b3baf89e1bf006ef40e1471c628813e'), 'Zubets', 'Mykola');
#INSERT INTO `favorites` (`VendorCode`, `CustomerID`) VALUES (12, 18);
#INSERT INTO `favorites` (`VendorCode`, `CustomerID`) VALUES (12, 19);
#SELECT Login, Email FROM user WHERE Login = "123" OR Email = "123";

