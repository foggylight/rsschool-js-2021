create TABLE category(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  image TEXT
);

create TABLE card(
  id SERIAL PRIMARY KEY,
  word VARCHAR(255),
  translation VARCHAR(255),
  audio TEXT,
  image TEXT,
  category_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES category (id)
);
