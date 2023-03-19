-- Active: 1679065586372@@0.0.0.0@5432@meal_sharing@public

CREATE TABLE
    meals (
        id SERIAL PRIMARY KEY,
        title varchar(30) NOT NULL,
        description text,
        location varchar(50) NOT NULL,
        "when" timestamp without time zone NOT NULL,
        max_reservations integer NOT NULL,
        price decimal(6, 2) NOT NULL,
        created_date date NOT NULL
    );

INSERT INTO
    meals (
        id,
        title,
        description,
        location,
        "when",
        max_reservations,
        price,
        created_date
    )
VALUES (
        3,
        'italian meatloaf',
        'white bredcrumbs, parmesan, minced beef, onion, pancetta, garlic',
        'Tordenskjoldsgade 15, København 1055',
        '2023-02-14 00:00:00',
        5,
        20.00,
        '2023-01-10'
    ), (
        4,
        'cannoli',
        'golden sugar, flour, cocoa powder, dark chocolate, milk chocolate',
        'Reykjaviksgade 1, København 2300',
        '2023-02-15 00:00:00',
        2,
        10.00,
        '2023-01-20'
    ), (
        22,
        'italian soup',
        'tiny pasta, chicken stock, swiss chard, parmesan, milk, ground beef',
        'Røsågade 6, København, 2300',
        '2023-03-21 00:00:00',
        6,
        12.00,
        '2023-03-19'
    ), (
        23,
        'mushroom soup',
        'milk, mushrooms, corn, oats, chicken broth, chilly, olive oil',
        'Nyhavnsgade 31, København, 2300',
        '2023-04-21 00:00:00',
        6,
        15.00,
        '2023-03-10'
    ), (
        24,
        'chilli con carne',
        'onions, red pepper, garlic, minced beef, tomatoes, kidney beans',
        'Østerbrogade 12, København, 2100',
        '2023-02-21 00:00:00',
        9,
        25.00,
        '2023-02-10'
    ), (
        25,
        'vegetarian lasagne',
        'tomatoes, mozzarella, basil, carrots, garlic, aubergines',
        'Sønderjyllands Alle 2,Frederiksberg, 2000 ',
        '2023-02-24 00:00:00',
        10,
        12.00,
        '2023-02-09'
    ), (
        26,
        'vegetarian ramen',
        'noodles, pak choi, spring onions, sesame seeds, chilli',
        'Hattensens Alle, Frederiksberg,  2000 ',
        '2023-03-01 00:00:00',
        4,
        9.00,
        '2023-02-27'
    ), (
        27,
        'brown butter linguine',
        'linguine, butter, chilli flakes, Grana Padano',
        'Gammel Jernbanevej 17-15, København, 2500',
        '2023-03-10 00:00:00',
        4,
        18.00,
        '2023-03-01'
    );

CREATE TABLE
    reservations (
        id SERIAL PRIMARY KEY,
        number_of_guests INTEGER NOT NULL,
        meal_id INTEGER NOT NULL REFERENCES meals(id) ON DELETE CASCADE,
        created_date DATE NOT NULL,
        contact_phonenumber VARCHAR(15) NOT NULL,
        contact_name VARCHAR(50) NOT NULL,
        contact_email VARCHAR(50) NOT NULL
    );

INSERT INTO
    reservations (
        id,
        number_of_guests,
        meal_id,
        created_date,
        contact_phonenumber,
        contact_name,
        contact_email
    )
VALUES (
        1,
        4,
        22,
        '2023-03-21',
        '91975884',
        'Dan Jecu',
        'danjecu@outlook.com'
    ), (
        12,
        2,
        4,
        '2023-03-15',
        '91975884',
        'Dan-Alexandru Jecu',
        'danjecu@outlook.com'
    ), (
        13,
        8,
        24,
        '2023-03-15',
        '0736496375',
        'Jecu Dan Alexandru',
        'jdanalexandru@gmail.com'
    ), (
        14,
        3,
        24,
        '2023-03-15',
        '12438510',
        'Louise Skovgaard',
        'louise@gmail.com'
    ), (
        15,
        6,
        23,
        '2023-03-15',
        '91975884',
        'Dan-Alexandru Jecu',
        'danjecu@outlook.com'
    ), (
        16,
        2,
        23,
        '2023-03-15',
        '0736496375',
        'Jecu Dan Alexandru',
        'jdanalexandru@gmail.com'
    ), (
        17,
        3,
        23,
        '2023-03-15',
        '91975884',
        'Dan-Alexandru Jecu',
        'danjecu@outlook.com'
    ), (
        18,
        4,
        23,
        '2023-03-15',
        '91975884',
        'Dan-Alexandru Jecu',
        'danjecu@outlook.com'
    ), (
        19,
        2,
        22,
        '2023-03-15',
        '123232',
        'Lou',
        'louise@gmail.com'
    ), (
        20,
        4,
        3,
        '2023-03-16',
        '91975884',
        'Dan-Alexandru Jecu',
        'danjecu@outlook.com'
    ), (
        21,
        2,
        4,
        '2023-03-17',
        '91975884',
        'Dan-Alexandru Jecu',
        'danjecu@outlook.com'
    ), (
        22,
        4,
        22,
        '2023-03-17',
        '0736496375',
        'Jecu Dan Alexandru',
        'jdanalexandru@gmail.com'
    ), (
        23,
        1,
        22,
        '2023-03-17',
        '91975884',
        'Dan-Alexandru Jecu',
        'danjecu@outlook.com'
    ), (
        24,
        1,
        22,
        '2023-03-17',
        '0736496375',
        'Jecu Dan Alexandru',
        'jdanalexandru@gmail.com'
    ), (
        25,
        4,
        22,
        '2023-03-17',
        '0736496375',
        'Jecu Dan Alexandru',
        'jdanalexandru@gmail.com'
    ), (
        26,
        1,
        22,
        '2023-03-17',
        '0736496375',
        'Jecu Dan Alexandru',
        'jdanalexandru@gmail.com'
    ), (
        27,
        4,
        22,
        '2023-03-17',
        '91975884',
        'Dan-Alexandru Jecu',
        'danjecu@outlook.com'
    ), (
        28,
        1,
        22,
        '2023-03-17',
        '91975884',
        'Dan-Alexandru Jecu',
        'danjecu@outlook.com'
    );

CREATE TABLE
    reviews (
        id SERIAL PRIMARY KEY,
        title varchar(70) NOT NULL,
        description text,
        meal_id int NOT NULL,
        stars int NOT NULL,
        created_date date NOT NULL,
        CONSTRAINT fk_review FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE ON UPDATE CASCADE
    );

INSERT INTO
    reviews (
        id,
        title,
        description,
        meal_id,
        stars,
        created_date
    )
VALUES (
        7,
        'Good',
        'Beautiful location',
        22,
        4,
        '2023-02-10'
    ), (
        8,
        'Best food',
        'Very good food',
        22,
        5,
        '2023-02-11'
    ), (
        9,
        'Decent',
        'Too salty',
        23,
        2,
        '2023-02-12'
    ), (
        10,
        'Best Soup',
        'This is the best soup in the city',
        23,
        5,
        '2023-03-17'
    ), (
        11,
        'Best soup',
        '',
        22,
        5,
        '2023-03-17'
    ), (
        12,
        'Too sweet',
        'They were way too sweet',
        4,
        1,
        '2023-03-17'
    ), (
        13,
        'Best Chilli',
        'This was by far the best one',
        24,
        5,
        '2023-03-17'
    ), (
        14,
        'The best',
        '',
        4,
        5,
        '2023-03-17'
    ), (
        15,
        'The best',
        '',
        25,
        4,
        '2023-03-17'
    ), (
        16,
        'The best',
        '',
        24,
        5,
        '2023-03-17'
    ), (
        17,
        'The best',
        'best ramen',
        26,
        5,
        '2023-03-17'
    ), (
        18,
        'too spicy',
        'this was very spicy',
        26,
        3,
        '2023-03-17'
    ), (
        19,
        'Super good food',
        '',
        27,
        4,
        '2023-03-17'
    ), (
        20,
        'the best',
        '',
        27,
        5,
        '2023-03-17'
    );