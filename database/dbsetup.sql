DROP TABLE IF EXISTS place_photo;
DROP TABLE IF EXISTS review_photo;
DROP TABLE IF EXISTS photo;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS place;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS category;

CREATE TABLE category (
	id			SERIAL2			PRIMARY KEY,
	name		VARCHAR(30)
);

CREATE TABLE customer (
	id			SERIAL			PRIMARY KEY,
	email		VARCHAR(256),
	password	VARCHAR(8)
);

CREATE TABLE place (
	id 			SERIAL8 		PRIMARY KEY,
	name 		VARCHAR(256),
	latitude 	FLOAT8,
	longitude 	FLOAT8,
	description	VARCHAR(512),
	category_id	INT2			REFERENCES category(id),
	customer_id	INT				REFERENCES customer(id)
);

CREATE TABLE review (
	id			SERIAL			PRIMARY KEY,
	location_id	INT8			REFERENCES place(id),
	customer_id INT				REFERENCES customer(id),
	text		VARCHAR(512),
	rating		INT2
);

CREATE TABLE photo (
	id			SERIAL			PRIMARY KEY,
	file		BYTEA
);

CREATE TABLE place_photo (
	location_id INT8			REFERENCES place(id),
	photo_id	INT				REFERENCES photo(id)
);

CREATE TABLE review_photo (
	review_id	INT				REFERENCES review(id),
	photo_id	INT				REFERENCES photo(id)
);