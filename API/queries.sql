--get playlists from people you're following
SELECT *
FROM Playlist NATURAL JOIN SELECT followed
                           FROM Following
                           WHERE follower = ###ID OF USER###

--get songs from a playlist
SELECT *
FROM Songs NATURAL JOIN SELECT so_id
                        From PlaylistSong
                        WHERE pl_id = ###ID OF PLAYLIST###

--get songs from queue
SELECT *
FROM Songs NATURAL JOIN SELECT so_id, position
                        From Queue
                        WHERE us_id = ###ID OF USER###

--get songs by artist
SELECT *
FROM Songs
WHERE ar_id = ###ID OF ARTIST##

--get albums from a specific year
SELECT *
FROM Albums
WHERE year = ###year###

--insert song into playlist
INSERT INTO PlaylistSong (pl_id, so_id)
VALUES (###insert correct info##)

--copy playlist from another user
