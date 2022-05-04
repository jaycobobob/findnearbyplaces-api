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
	email		VARCHAR(256)	UNIQUE,
	password	VARCHAR(64)
);

CREATE TABLE place (
	id 			SERIAL8 		PRIMARY KEY,
	name 		VARCHAR(256),
	address		TEXT,
	description	VARCHAR(512),
	category_id	INT2			REFERENCES category(id),
	customer_id	INT				REFERENCES customer(id)
);

CREATE TABLE review (
	id			SERIAL			PRIMARY KEY,
	location_id	INT8			REFERENCES place(id) ON DELETE CASCADE,
	customer_id INT				REFERENCES customer(id),
	text		VARCHAR(512),
	rating		INT2
);

CREATE TABLE photo (
	id			SERIAL			PRIMARY KEY,
	file		TEXT
);

CREATE TABLE place_photo (
	location_id INT8			REFERENCES place(id) ON DELETE CASCADE,
	photo_id	INT				REFERENCES photo(id) ON DELETE CASCADE
);

CREATE TABLE review_photo (
	review_id	INT				REFERENCES review(id) ON DELETE CASCADE,
	photo_id	INT				REFERENCES photo(id) ON DELETE CASCADE
);

INSERT INTO customer (email, password) VALUES ('su', 'password'); -- 1

INSERT INTO category (name) VALUES 
	('Fast Food'), --1
	('Grocery Store'); -- 2

INSERT INTO place (name, address, description, category_id, customer_id) VALUES 
	('Taco Bell', '123 Taco Bell Street', 'Home of the chalupa', 1, 1), -- 1
	('Wendys', '126 Taco Bell Street', 'Underwhelming food', 1, 1), -- 2
	('Walmart', '901 E 2nd Street', '20% worse than Target', 2, 1); -- 3

INSERT INTO photo (file) VALUES
	('https://cdn-image.foodandwine.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/1578599345/taco-bell-salary-FT-BLOG0120.jpg?itok=cAOus1U5'),
	('https://th.bing.com/th/id/R.4c11b4e47731a1166fa79eb751dafcd8?rik=O09Iil5pQtG2KQ&pid=ImgRaw&r=0'),
	('https://civileats.com/wp-content/uploads/2019/07/190711-walmart-grocery-retail-monopoly-store-front-1.jpg'),
	('https://lonniesmalley.com/wp-content/uploads/2020/04/how-to-make-a-Taco-Bell-chalupa-from-home.jpg'),
	('https://assets.londonist.com/uploads/2018/11/i875/46491578_2044005402288881_2423062210138865664_n.jpg'),
	('https://www.funnewsnow.com/wp-content/uploads/2020/11/Toasted-Cheddar-Chalupa.jpg');
	
INSERT INTO place_photo VALUES (1, 1), (2, 2), (3, 3);

INSERT INTO review (location_id, customer_id, text, rating) VALUES
	(1, 1, 'They are clutch af at 3 am.. bless up', 10), -- 1
	(1, 1, 'They were slow with the food, but still good.', 8), -- 2
	(1, 1, 'Bro my taco was literally a pile of goop', 1), -- 3
	(2, 1, 'Not enough food for the price', 4); -- 4
	
INSERT INTO review_photo VALUES (1, 4), (1, 5), (1, 6);





