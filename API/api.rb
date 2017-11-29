# api.rb
require 'sinatra'
require 'sequel'
require 'json'
require 'base64'
require 'SecureRandom'

DB = Sequel.connect(:adapter => 'mysql2', :user => 'soundify', :password=>'tomozpan', :host => 'soundify.ccj707h8lkgk.us-east-1.rds.amazonaws.com', :database => 'soundify')

before do
	response.headers['Access-Control-Allow-Origin'] = '*'
end

#get all songs in playlist pl_id
get '/playlist/:pl_id' do
    if params['pl_id'] == '123'
			playlist = [{:title => 'Capsize', :artist => 'FRENSHIP', :artist_id => 12, :duration => 237, :song_key => 123},{:title => '1000 Nights', :artist => 'FRENSHIP', :artist_id => 12, :duration => 164, :song_key => 567}];
		elsif params['pl_id'] == '132'
			playlist = [{:title => '1000 Nights', :artist => 'FRENSHIP', :artist_id => 12, :duration => 164, :song_key => 567}];
		else
			playlist = [{:title => 'NA', :artist => 'NA', :artist_id => 0, :duration => 0, :song_key => 0}]
		end
		JSON.generate(playlist)
end
#get all playlist information from usr_id
get '/getListPlaylist/:usr_id' do
	#get all the playlists for a specific user
	getAllPlaylistsForUser(params['usr_id'])
	JSON[playlist]
end
#get all the information about an artist given their id. We need the name, description, their albums, the songs in their albums and their respective ids
get '/getArtistInformation/:ar_id' do
	if params['ar_id'] == '12'
		artist_info = {
			'artistInfo': [
				{
					'Name'=> 'FRENSHIP',
					'artist_id' => 12,
					'Description'=> 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis hendrerit ipsum, at maximus est. Maecenas consequat consectetur orci, in laoreet dolor gravida in. Cras suscipit semper ex, eget consequat libero interdum ac. Nam sed posuere ligula. Vivamus vel sem ut neque imperdiet congue. Quisque ac dolor a risus laoreet elementum. Duis lacinia risus odio, ac varius mi sagittis sit amet. Vestibulum ut diam fringilla, maximus libero eget, tincidunt nulla. Integer eleifend odio et elementum pretium. Nulla id erat vulputate, volutpat mi at, consequat magna. Vestibulum id dolor in tellus lobortis porta. Mauris a pulvinar felis, euismod bibendum urna. Proin ac magna interdum, suscipit tortor ac, faucibus erat.',
					'Albums'=> [
						{
							'album_title' => 'album 1',
							'songs' => [{
									'songName' => 'Capsize',
									'song_key' => 123,
									'duration' => 237
									},
									{
										'songName' => '1000 Nights',
										'song_key' => 567,
										'duration' => 164
									}],
							},
							{
							'album_title' => 'album 2',
							'songs' => [{
									'songName' => 'Song a',
									'song_key' => 1,
									'duration' => 2
									},
									{
										'songName' => 'Song b',
										'song_key' => 2,
										'duration' => 164
								}]
							}]
				}]
		}
		JSON[artist_info]
	else
		artist_info = {
			'artist_info':[
				{
			      'Name'=> 'NA',
			      'artist_id' => 0,
			      'Description'=> 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis hendrerit ipsum, at maximus est. Maecenas consequat consectetur orci, in laoreet dolor gravida in. Cras suscipit semper ex, eget consequat libero interdum ac. Nam sed posuere ligula. Vivamus vel sem ut neque imperdiet congue. Quisque ac dolor a risus laoreet elementum. Duis lacinia risus odio, ac varius mi sagittis sit amet. Vestibulum ut diam fringilla, maximus libero eget, tincidunt nulla. Integer eleifend odio et elementum pretium. Nulla id erat vulputate, volutpat mi at, consequat magna. Vestibulum id dolor in tellus lobortis porta. Mauris a pulvinar felis, euismod bibendum urna. Proin ac magna interdum, suscipit tortor ac, faucibus erat.',
			      'Albums'=> [
			        {
			          'album_title' => 'No Albums Available',
			          'songs' => [{
			              'songName' => 'No Songs Available',
			              'song_key' => 0,
			              'duration' => 0
			              }]
			          }]
			    }]
		}
		JSON[artist_info]
	end
end
#get the list of all of usr_id's friends
get '/getListFriends/:usr_id' do
	#get all the friends for a specific user
end
# get the queue of a user
get '/queue/:usr_id' do

	queue = getQueueForUser(params['usr_id'])
	info = [:queue => queue]
	JSON[info]

end
# get all of the information about a user
get '/initialize/:usr_id' do
	#This needs to get all of the information about a specific user based on the user id
	username = getUserName(params['usr_id'])
	playlist = getAllPlaylistsForUser(params['usr_id'])
	friends = getAllFriendsForUser(params['usr_id'])
	queue = getQueueForUser(params['usr_id'])
	info = [:username => username, :playlist => playlist, :friends => friends, :queue => queue]
	JSON[info]
end
post '/signup' do
	if params['username'] and params['password']
		DB.run("INSERT INTO User(us_id, username, password) VALUES ('#{SecureRandom.uuid}','#{params['username']}','#{params['password']}')")
		{ 'token1'=>Base64.encode64(params['username']), 'token2'=>Base64.encode64(params['password']) }.to_json
	else
		{'error'=>'invalid username and password for signup'}.to_json
	end
end
post '/login' do
	if params['username'] and params['password']
		if DB["SELECT * FROM User WHERE User.username = '#{params['username']}' AND User.password = '#{params['password']}'"].count == 1
			{ 'token1'=>Base64.encode64(params['username']), 'token2'=>Base64.encode64(params['password']) }.to_json
		else
			{'error'=>'invalid username and password'}.to_json
		end
	else
		{'error'=>'user not found'}.to_json
    end
end
# add a friend to user's list of friends based on usr_id
post '/addFriend/:usr_id' do
	# add the friend to the database. THe usr_id is the user's id. The friend is in the post information with the tag of 'friend'. Add the user.

end
post '/something_secure/' do # someome submits a form to /something_secure using post
    # there's a field in a form where the name in the form tag is post_from_html_key
    puts params['post_from_html_key'] # <input type='password' name='post_from_html_key' />
    # puts prints stuff out to the serve console, nothing is returned to the user
    # if you want to return something, do:
    #json {'keyyy': 'a test value'} # send a hash (dict) over json
end

def getQueueForUser(usr_id)
	query = "SELECT Song.title, Artist.name, Song.popularity AS duration, Song.so_id FROM Queue, Song, Album, Artist WHERE Queue.so_id = Song.so_id AND Song.al_id = Album.al_id AND Album.ar_id = Artist.ar_id AND Queue.us_id = '#{usr_id}'"
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
	puts query
	friend_tupule = DB[query]
	friends = []
	friend_tupule.each {|x| friends.push(x)}
	return friends
end
