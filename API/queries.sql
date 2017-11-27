--get playlists from people you're following
SELECT *
FROM Playlist
JOIN (SELECT followed FROM Following WHERE follower = #### user ID here ###) as hey
  ON(Playlist.us_id = hey.followed);

--get songs from a playlist
SELECT *
FROM Song
NATURAL JOIN (SELECT so_id
                        From PlaylistSong
                        WHERE pl_id = ### pl id here ###) AS son;

--get songs from queue
SELECT *
FROM Song
NATURAL JOIN (SELECT so_id, position
                        From Queue
                        WHERE us_id = ####user id here###) as lol;

--get songs by artist
SELECT *
FROM Song
WHERE ar_id = ###ID OF ARTIST##;

--get albums from a specific year
SELECT *
FROM Albums
WHERE year = ###year###;

--insert song into playlist
INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (###insert correct info##)

--copy playlist from another user
