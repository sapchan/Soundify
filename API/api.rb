# api.rb
require 'sinatra'
require 'sinatra/cors'
require 'sequel'
require 'json'
require 'base64'
require 'SecureRandom'
require 'execjs'

DB = Sequel.connect(:adapter => 'mysql2', :user => 'soundify', :password=>'tomozpan', :host => 'soundify.ccj707h8lkgk.us-east-1.rds.amazonaws.com', :database => 'soundify')

set :allow_origin, "*"
set :allow_methods, "GET,HEAD,POST"
set :allow_headers, "content-type,if-modified-since"
set :expose_headers, "location,link"

#get all songs in playlist pl_id
get '/playlist/:pl_id' do
	error_hash = checkToken(params)
	if error_hash['error'] == 5
		error_hash.to_json
	else
#    begin
		query = "SELECT SO.s_title, SO.popularity, SO.so_id, Artist.name, Artist.ar_id FROM (SELECT DISTINCT so_id FROM PlaylistSong WHERE pl_id = '#{params['pl_id']}') AS PS NATURAL JOIN (SELECT Song.title AS s_title, Song.popularity, Song.so_id, Song.al_id FROM Song) AS SO NATURAL JOIN (SELECT Album.al_id, Album.ar_id FROM Album) AS AL NATURAL JOIN Artist"
		songs = DB[query]
		playlist = []
		for song in songs
			playlist << {:title => song[:s_title], :artist => song[:name], :artist_id => song[:ar_id], :duration => song[:popularity], :song_key => song[:so_id]}
		end
		JSON.generate(playlist)
#		rescue
#			playlist = [{:title => '1000 Nights', :artist => 'FRENSHIP', :artist_id => 12, :duration => 164, :song_key => 567}];
#			JSON.generate(playlist)
#		end
	end
end

#get all playlist information from usr_id
get '/getListPlaylist/:usr_id' do
	error_hash = checkToken(params)
	if error_hash['error'] == 5
		error_hash.to_json
	else
		#get all the playlists for a specific user
		puts params['usr_id']
		playlist = getAllPlaylistsForUser(params['usr_id'])
		JSON[playlist]
	end
end

#get all the information about an artist given their id. We need the name, description, their albums, the songs in their albums and their respective ids
get '/getArtistInformation/:ar_id' do
	error_hash = checkToken(params)
	if error_hash['error'] == 5
		error_hash.to_json
	else
		songs = DB["SELECT *, Album.title AS Atitle FROM Album NATURAL JOIN Artist JOIN Song ON(Album.al_id = Song.al_id) WHERE ar_id = '#{params['ar_id']}'"].as_hash(:so_id)
		# wew kids, get ready for some crazy formatting :yikes:
		# @sacheth I hope this is how you want it

		# use just the first song (it breaks after the first iteration)
		# to set up the artist_info object
		artist_info = {}
		songs.each do |key, stuff|
			artist_info = {
				'artistInfo':[
					{
						'Name' => stuff[:name],
						'artist_id' => stuff[:ar_id],
						'Description' => stuff[:description],
						'Albums' => []
					}
				]
			}
			break
		end

		# now populate that object with albums and songs
		songs.each do |key, stuff|
			# make sure to make a new album if the album isn't already listed
			if(artist_info[:artistInfo][0]['Albums'].all? {|a| a['album_title'] != stuff[:Atitle]})
				artist_info[:artistInfo][0]['Albums'] << {'album_title' => stuff[:Atitle],
																				'songs': [{'songName' => stuff[:title],
																										 'song_key' => stuff[:so_id],
																										 'duration' => stuff[:popularity],
																										 'ar_id' => stuff[:ar_id],
																										 'artistName' => stuff[:name],

																										 }] }
			else # if the album is listed, add the song to it
				for i in 0...artist_info[:artistInfo][0]['Albums'].length
					if artist_info[:artistInfo][0]['Albums'][i]['album_title'] == stuff[:Atitle]
						artist_info[:artistInfo][0]['Albums'][i][:songs] << {'songName' => stuff[:title],
																												'song_key' => stuff[:so_id],
																												'duration' => stuff[:popularity],
		 																									 'ar_id' => stuff[:ar_id],
		 																									 'artistName' => stuff[:name],
																												}
					end
				end
			end
		end

		return JSON[artist_info]
	end
end

#get the list of all of usr_id's friends
get '/getListFriends/:usr_id' do
	#get all the friends for a specific user
end

# get the queue of a user
get '/queue/:usr_id' do
	error_hash = checkToken(params)
	if error_hash['error'] == 5
		error_hash.to_json
	else
		queue = getQueueForUser(params['usr_id'])
		info = {:queue => queue}
		JSON[info.merge(error_hash)]
	end
end

# get all of the information about a user
get '/initialize/:usr_id' do
	#This needs to get all of the information about a specific user based on the user id
	error_hash = checkToken(params)
	if error_hash['error'] == 5
		error_hash.to_json
	else
		username = getUserName(params['usr_id'])
		playlist = getAllPlaylistsForUser(params['usr_id'])
		friends = getAllFriendsForUser(params['usr_id'])
		queue = getQueueForUser(params['usr_id'])
		info = {:username => username, :playlist => playlist, :friends => friends, :queue => queue}
		JSON[info.merge(error_hash)]
	end
end

post '/signup' do
		us_id = SecureRandom.uuid
		my_has = JSON.parse(request.body.read)
		user = my_has['username']
		pass = my_has['password']
		begin
			DB.run("INSERT INTO User(us_id, username, password) VALUES ('#{us_id}','#{user}','#{pass}')")
			{ 'token1'=>Base64.encode64(user), 'token2'=>Base64.encode64(pass), 'us_id'=> us_id, 'flag' => true }.to_json
		rescue
			{'error'=>'invalid username and password for signup', 'flag' => false}.to_json
		end
end

post '/login' do
	user = params['username']
	pass = params['password']
	query = "SELECT * FROM User WHERE User.username = '#{user}' AND User.password = '#{pass}'"
	if DB[query].count == 1
	  dataset = DB[query]
	  us_id = dataset.map(:us_id)[0]
	  { 'token1'=>Base64.encode64(user), 'token2'=>Base64.encode64(pass), 'us_id'=> us_id, 'flag' => true}.to_json
	else
	  {'error'=>'invalid username and password', 'flag' => false}.to_json
	end
end
# add a friend to user's list of friends based on usr_id
post '/addFriend' do
	# add the friend to the database. THe usr_id is the user's id. The friend is in the post information with the tag of 'friend'. Add the user.
	my_has = JSON.parse(request.body.read)
	usr_id = my_has['usr_id']
	friend = my_has['friend']
	begin
		query = "INSERT INTO Following (follower, followed) VALUES ('#{params['usr_id']}', '#{params['friend']}')" ##### we need to know who the person is who is initiating the follow
		DB[query]
		friends = getAllFriendsForUser(params['usr_id'])
		info = [:error => 0, :friends => friends]
		JSON[info]
	rescue
		info=[:error => 1]
	end
end

post '/addSongToPlaylist' do
	my_has = JSON.parse(request.body.read)
	so_id = my_has['so_id']
	pl_id = my_has['pl_id']
	puts so_id
	puts pl_id
	DB.run("INSERT INTO PlaylistSong(pl_id, so_id) VALUES ('#{pl_id}', '#{so_id}')")
end

def getQueueForUser(usr_id)
	query = "SELECT Song.title, Artist.name AS artist, Artist.ar_id AS artist_id, Song.popularity AS duration, Song.so_id AS song_key FROM Queue, Song, Album, Artist WHERE Queue.so_id = Song.so_id AND Song.al_id = Album.al_id AND Album.ar_id = Artist.ar_id AND Queue.us_id = '#{usr_id}'"
	playlist_name_tupule = DB[query]
	playlist = []
	playlist_name_tupule.each { |x|  playlist.push(x)}
	return playlist
end

def getUserName(user_id)
	begin
		dataset = DB["SELECT username FROM User WHERE User.`us_id` = '#{user_id}'"]
		username = dataset.map(:username)[0]
	rescue
		username = "Error: User Not Available. Please Reload the page."
	end
	return username
end

def getAllPlaylistsForUser(user_id)
	playlist_name_tupule = DB["SELECT Playlist.pl_id, Playlist.name FROM Playlist WHERE Playlist.us_id = '#{user_id}'"]
	playlist = []
	playlist_name_tupule.each { |x|  playlist.push(x)}
	return playlist
end

def getAllFriendsForUser(user_id)
	query = "SELECT username, us_id FROM User WHERE us_id IN (SELECT follower FROM Following WHERE followed = '#{user_id}')"
	friend_tupule = DB[query]
	friends = []
	friend_tupule.each {|x| friends.push(x)}
	return friends
end

def checkToken(params)
	if params['token1'] and params['token2']
	    username = Base64.decode64(params['token1'])
	    password = Base64.decode64(params['token2'])
	    if DB["SELECT * FROM User WHERE User.username = '#{username}' AND User.password = '#{password}'"].count == 1
	        return {'error'=>0}
	    end
    end
    return {'error'=>5}
end
