CREATE TABLE Users (
   id: INTEGER PRIMARY KEY AUTOINCREMENT,
   firstName: VARCHAR(50),
   lastName: VARCHAR(50),
   email: VARCHAR(50),
   username: VARCHAR(20),
   password: VARCHAR,
   token: VARCHAR
)

CREATE TABLE Sports (
id:INTEGER PRIMARY KEY AUTOINCREMENT,
ownerId: INTEGER REFERENCES Users(id),
address: VARCHAR,
city: VARCHAR,
state: VARCHAR,
country: VARCHAR,
lat: DECIMAL(9,6),
lng: DECIMAL(9,6),
name: VARCHAR,
description: VARCHAR,
price: DECIMAL,
avgRating: DECIMAL,
previewImage: VARCHAR REFERENCES SpotImages(url)
)
