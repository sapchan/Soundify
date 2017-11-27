INSERT INTO Artist (ar_id, name, description)
VALUES (0, 'Lorde', 'From New Zealand');

INSERT INTO Artist (ar_id, name, description)
VALUES (1, 'Vampire Weekend', 'The absolute Boys.');

INSERT INTO Artist (ar_id, name, description)
VALUES (2, 'ABBA', 'Swedish as heck. Mama Mia music.');



INSERT INTO Album (al_id, title, ar_id, date)
VALUES (0, 'Pure Heroine', 0, 2013);

INSERT INTO Album (al_id, title, ar_id, date)
VALUES (1, 'Melodrama', 0, 2017);

INSERT INTO Album (al_id, title, ar_id, date)
VALUES (2, 'Vampire Weekend', 1, 2008);

INSERT INTO Album (al_id, title, ar_id, date)
VALUES (3, 'Contra', 1, 2010);

INSERT INTO Album (al_id, title, ar_id, date)
VALUES (4, 'Modern Vampires of the City', 1, 2013);

INSERT INTO Album (al_id, title, ar_id, date)
VALUES (5, 'Gold: Greatest Hits', 2, 2002);



INSERT INTO Song (so_id, title, ar_id, al_id, popularity, link, genre)
VALUES (0, "400 Lux", 0, 0, 1.0, 'www.google.com', 'Alternative');

INSERT INTO Song (so_id, title, ar_id, al_id, popularity, link, genre)
VALUES (1, "Ribs", 0, 0, 0.95, 'www.google.com', 'Alternative');

INSERT INTO Song (so_id, title, ar_id, al_id, popularity, link, genre)
VALUES (2, "Royals", 0, 0, 0.35, 'www.google.com', 'Alternative');

INSERT INTO Song (so_id, title, ar_id, al_id, popularity, link, genre)
VALUES (3, "The Louvre", 0, 1, 0.85, 'www.google.com', 'Alternative');

INSERT INTO Song (so_id, title, ar_id, al_id, popularity, link, genre)
VALUES (4, "Oxford Comma", 1, 2, 0.85, 'www.google.com', 'Alternative');

INSERT INTO Song (so_id, title, ar_id, al_id, popularity, link, genre)
VALUES (5, "I Stand Corrected", 1, 2, 0.94, 'www.google.com', 'Alternative');

INSERT INTO Song (so_id, title, ar_id, al_id, popularity, link, genre)
VALUES (6, "M79", 1, 2, 1, 'www.google.com', 'Alternative');

INSERT INTO Song (so_id, title, ar_id, al_id, popularity, link, genre)
VALUES (7, "White Sky", 1, 3, 0.76, 'www.google.com', 'Alternative');

INSERT INTO Song (so_id, title, ar_id, al_id, popularity, link, genre)
VALUES (8, "Giving Up The Gun", 1, 3, 0.78, 'www.google.com', 'Alternative');

INSERT INTO Song (so_id, title, ar_id, al_id, popularity, link, genre)
VALUES (9, "Obvious Bicycle", 1, 4, 0.88, 'www.google.com', 'Alternative');

INSERT INTO Song (so_id, title, ar_id, al_id, popularity, link, genre)
VALUES (10, "Don't Lie", 1, 4, 0.83, 'www.google.com', 'Alternative');

INSERT INTO Song (so_id, title, ar_id, al_id, popularity, link, genre)
VALUES (11, "Dancing Queen", 2, 5, 0.99, 'www.google.com', 'Pop');

INSERT INTO Song (so_id, title, ar_id, al_id, popularity, link, genre)
VALUES (12, "Mamma Mia", 2, 5, 0.99, 'www.google.com', 'Pop');

INSERT INTO Song (so_id, title, ar_id, al_id, popularity, link, genre)
VALUES (13, "Take A Chance On Me", 2, 5, 0.99, 'www.google.com', 'Pop');



INSERT INTO User (us_id, username, password)
VALUES (0, 'Vincent', 'drowssap');

INSERT INTO User (us_id, username, password)
VALUES (1, 'Sam Whitman', 'password');

INSERT INTO User (us_id, username, password)
VALUES (2, 'Anna', 'sedlackova');



INSERT INTO Following (follower, followed)
Values (0,1);

INSERT INTO Following (follower, followed)
Values (1,0);

INSERT INTO Following (follower, followed)
Values (1,2);

INSERT INTO Following (follower, followed)
Values (2,0);



INSERT INTO Playlist (pl_id, name, us_id)
VALUES (0, 'Jams', 0);

INSERT INTO Playlist (pl_id, name, us_id)
VALUES (1, 'James', 1);

INSERT INTO Playlist (pl_id, name, us_id)
VALUES (2, 'Dope Ass Playlist', 2);

INSERT INTO Playlist (pl_id, name, us_id)
VALUES (3, 'Jams_2', 0);


INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (0,0);

INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (0,1);

INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (0,3);

INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (0,6);

INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (0,10);

INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (0,11);


INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (1,11);

INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (1,12);

INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (1,13);

INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (1,02);


INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (2,02);

INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (2,12);

INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (2,04);


INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (3,01);

INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (3,05);

INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (3,07);

INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (3,12);
