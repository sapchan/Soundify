# populateDB.rb
require 'sinatra'
require 'sequel'
require 'json'
require 'base64'
require 'SecureRandom'

DB = Sequel.connect(:adapter => 'mysql2', :user => 'soundify', :password=>'tomozpan', :host => 'soundify.ccj707h8lkgk.us-east-1.rds.amazonaws.com', :database => 'soundify')

post '/generateFakeUsers' do
	for i in 1..100 do
		#artist = 'artist_' + i.to_s
		#description = 'description_' + i.to_s
		#uuid = SecureRandom.uuid
		#DB.run("INSERT INTO Artist(ar_id, name, description) VALUES ('#{uuid}','#{artist}','#{description}')")
		artist = 'artist_' + i.to_s
		dataset = DB["SELECT ar_id FROM Artist WHERE Artist.`name` = '#{artist}'"]
		ar_id = dataset.map(:ar_id)[0]
		album_title = 'album_' + i.to_s
		album_uuid = SecureRandom.uuid
		DB.run("INSERT INTO Album(al_id,title,ar_id,date) VALUES ('#{album_uuid}', '#{album_title}', '#{ar_id}', 'NULL')")
	end
end

post '/generateFakeArtists' do
	for i in 1..100 do
		artist = 'artist_' + i.to_s
		description = 'description_' + i.to_s
		uuid = SecureRandom.uuid
		DB.run("INSERT INTO Artist(ar_id, name, description) VALUES ('#{uuid}','#{artist}','#{description}')")
	end
end

post '/generateFakeSongs' do
	for i in 1..100 do
		album_name = 'album_' + i.to_s
		dataset = DB["SELECT al_id FROM Album WHERE Album.`title` = '#{album_name}'"]
		al_id = dataset.map(:al_id)[0]
		for j in 1..10 do
			song_name = 'song_' + i.to_s + '_' + j.to_s
			so_id = SecureRandom.uuid
			popularity = SecureRandom.random_number.round(2)
			link = 'https://cf-media.sndcdn.com/wxH3ECnNZIxW.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vd3hIM0VDbk5aSXhXLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE1MTE4NDU5ODJ9fX1dfQ__&Signature=uqujPOweRzikPq3NRRL-A-mKLkV0nXJXtUuy8ENw-S7BAsR-P~Mn1wGehSMbojSxN2UQBFdkbJB7~7BmgsnCbu3vaVxUYqHPqxWCrvVTDUjYxA7pOjrrMlVyVXtQYO4LbRnCl51rPFU-iWqbxfX7K03Cp5qQVsBv12M1t3LOkX8F4UjMe2eICNLsc9et1kvQ1ptMpMhGX-o9wE-9i-6xCfkjOG~UAHMUIWd3J8ePVmwj9C94ywnjnl8Gl0ZosA1ZUjs2KVeM4tGqY9YBeYfNTEn-p1S75dUOfFrTfes~8QwCNqujXLXCkUj5mHDU8JqK-wmr5Hih~TGuxYHzt~iXZA__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ'
			genre= "Rude"
			DB.run("INSERT INTO Song(so_id,title,al_id,popularity,link,genre) VALUES ('#{so_id}', '#{song_name}', '#{al_id}', '#{popularity}', '#{link}', '#{genre}')")
		end
	end
end

post '/generateFakePlaylists' do
	for i in 1..98 do
		#artist = 'artist_' + i.to_s
		#description = 'description_' + i.to_s
		#uuid = SecureRandom.uuid
		#DB.run("INSERT INTO Artist(ar_id, name, description) VALUES ('#{uuid}','#{artist}','#{description}')")
		user = 'user_' + i.to_s
		dataset = DB["SELECT us_id FROM User WHERE User.`username` = '#{user}'"]
		us_id = dataset.map(:us_id)[0]
		for j in 1..10 do
			playlist_title = 'playlist_' + i.to_s + '_' + j.to_s
			playlist_uuid = SecureRandom.uuid
			puts playlist_title
			DB.run("INSERT INTO Playlist(pl_id,us_id,name) VALUES ('#{playlist_uuid}', '#{us_id}', '#{playlist_title}')")
		end
	end
end

post '/addSongsToFakePlaylists' do
	for i in 1..98 do
		for j in 1..10 do
			playlist_title = 'playlist_' + i.to_s + '_' + j.to_s
			dataset = DB["SELECT pl_id FROM Playlist WHERE Playlist.`name` = '#{playlist_title}'"]
			pl_id = dataset.map(:pl_id)[0]
			for k in 1..5 do
				begin
					randI = rand(98) + 1
					randJ = rand(10) + 1
					song_title = 'song_' + randI.to_s + '_' + randJ.to_s
					dataset = DB["SELECT so_id FROM Song WHERE Song.`title` = '#{song_title}'"]
					so_id = dataset.map(:so_id)[0]
					DB.run("INSERT INTO PlaylistSong(pl_id,so_id) VALUES ('#{pl_id}', '#{so_id}')")
				rescue
				end
			end
		end
	end
end
