#CREATE DATABASE userdb;
USE userdb;
#DROP TABLE User

#Unomment if doesn't exists
#CREATE TABLE user (
#  UserID  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
#  Email         VARCHAR(320)    NOT NULL,
#  Login         VARCHAR(30)     NOT NULL,
#  PasswordHash  BINARY(64)      NOT NULL,
#  LastName      VARCHAR(255)    NOT NULL,
#  FirstName     VARCHAR(255)    NOT NULL,
#  Phone			VARCHAR(20)		NOT NULL
#); 

#Drop before creating
#DROP TABLE orders;
CREATE TABLE orders (
  ID   INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  CustomerID INT NOT NULL,
  CreatedAt DATE NOT NULL,
  CallBack BOOL NOT NULL,
  FOREIGN KEY (CustomerID) REFERENCES user (UserID)
);

CREATE TABLE order_details (
  ID   INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  OrderID INT NOT NULL,
  VendorCode INT NOT NULL,
  Quantity INT NOT NULL,
  FOREIGN KEY (OrderID) REFERENCES orders (ID)
);

CREATE TABLE anonymous_orders (
  ID   INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  CreatedAt DATE NOT NULL,
  CallBack BOOL NOT NULL,
  LastName      VARCHAR(255)    NOT NULL,
  FirstName     VARCHAR(255)    NOT NULL,
  Phone			VARCHAR(20)		NOT NULL,
  Email         VARCHAR(320)    NOT NULL
);

CREATE TABLE anonymous_order_details (
  ID   INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  OrderID INT NOT NULL,
  VendorCode INT NOT NULL,
  Quantity INT NOT NULL,
  FOREIGN KEY (OrderID) REFERENCES anonymous_orders (ID)
);

#Uncomment if doesn't exist
#CREATE TABLE favorites (
#  ID   INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
#  VendorCode   INT NOT NULL,
#  CustomerID   INT NOT NULL,
#  FOREIGN KEY (CustomerID) REFERENCES user (UserID)
#);

#Delete auth column add phone column
ALTER TABLE user DROP COLUMN AuthToken;
ALTER TABLE user ADD Phone VARCHAR(20) NOT NULL AFTER FirstName;
DELETE FROM orders;
DELETE FROM user;