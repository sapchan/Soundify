--get playlists (and their owner's username) from people you follow
SELECT name, username, pl_id
FROM Playlist
JOIN (SELECT followed FROM Following WHERE follower = ######) as hey
  ON(Playlist.us_id = hey.followed)
NATURAL JOIN User;

--get songs from a playlist
SELECT Song.title, Song.link, Song.genre, Artist.name, Album.title, Album.date
FROM Song
NATURAL JOIN (SELECT so_id
              From PlaylistSong
              WHERE pl_id = #######) AS son
NATURAL JOIN Artist
JOIN Album ON (Album.al_id = Song.al_id);

--get songs from queue
SELECT Song.title, Song.link, Song.genre, Artist.name, Album.title, Album.date
FROM Song
NATURAL JOIN (SELECT so_id, position
                        From Queue
                        WHERE us_id = ######) as lol
NATURAL JOIN Artist
JOIN Album ON (Album.al_id = Song.al_id);

--get songs by artist
SELECT Song.title, Song.link, Song.genre, Artist.name, Album.title, Album.date
FROM (SELECT *
      FROM Song
      WHERE ar_id = ######) as Song
NATURAL JOIN Artist
JOIN Album ON (Album.al_id = Song.al_id);

--get albums from a specific year
SELECT *
FROM Album NATURAL JOIN Artist
WHERE date = ######; 

--insert song into playlist
INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (###insert correct info##)

--copy playlist from another user
