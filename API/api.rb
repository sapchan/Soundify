# api.rb
require 'sinatra'
require 'sequel'
require 'json'

#DB = Sequel.connect(:adapter => 'mysql2', :user => 'soundify', :password=>'tomozpan', :host => 'soundify.ccj707h8lkgk.us-east-1.rds.amazonaws.com', :database => 'soundify')

before do
	response.headers['Access-Control-Allow-Origin'] = '*'
end

#get all songs in playlist pl_id
get '/playlist/:pl_id' do
    if params['pl_id'] == '123'
			playlist = [{:title => 'Capsize', :artist => 'FRENSHIP', :duration => 237, :song_key => 123},{:title => '1000 Nights', :artist => 'FRENSHIP', :duration => 164, :song_key => 567}];
		elsif params['pl_id'] == '132'
			playlist = [{:title => '1000 Nights', :artist => 'FRENSHIP', :duration => 164, :song_key => 567}];
		else
			playlist = [{:title => 'NA', :artist => 'NA', :duration => 0, :song_key => 0}]
		end
		JSON.generate(playlist)
end

#get all playlist information from usr_id
get '/getListPlaylist/:usr_id' do
	#get all the playlists for a specific user
	if params['usr_id'] == '1'
		playlist = {
			'playlist' => [
				{
					'playlistName' => 'Cindy Playlist 1',
					'playlist_id' => 123
				},
				{
					'playlistName' => 'Cindy Playlist 2',
					'playlist_id' => 132
				},
			]
		}
	elsif params['usr_id'] == '2'
		playlist = {
			'playlist' => [
				{
					'playlistName' => 'Andy Playlist 1',
					'playlist_id' => 155
				},
				{
					'playlistName' => 'Andy Playlist 2',
					'playlist_id' => 1332
				},
			]
		}
	else
		playlist = {
			'playlist' => [
				{
					'playlistName' => 'NA',
					'playlist_id' => 0
				}
			]
		}
	end
	JSON[playlist]
end

#get the list of all of usr_id's friends
get '/getListFriends/:usr_id' do
	#get all the friends for a specific user
end

# get the queue of a user
get '/queue' do

	queue = {
		'queue': [
			{
				'title'=> 'Song 1',
				'artist'=> 'Creator 1',
				'duration'=> 132,
				'song_key'=> 1
			},
			{
				'title'=> 'Song 2',
				'artist'=> 'Creator 2',
				'duration'=> 273,
				'song_key'=> 2,
			}
		]
	}
	JSON[queue]

end

# get all of the information about a user
get '/initialize/:usr_id' do
	#This needs to get all of the information about a specific user based on the user id
	initialInformation = {
		'name' => 'testDummy',
		'usr_id' => 0,
		'playlist' => [
			{
				'playlistName' => 'playlist 1',
				'playlist_id' => 123
			},
			{
				'playlistName' => 'playlist 2',
				'playlist_id' => 132
			},
		],
		'friends' => [
			{
				'friend_name' => 'Cindy Pan',
				'friend_id' => 1
			},
			{
				'friend_name' => 'Andy Santulli',
				'friend_id' => 2
			}
		],
		'queue': [
			{
				'title'=> 'Song 1',
				'artist'=> 'Creator 1',
				'duration'=> 132,
				'song_key'=> 1
			},
			{
				'title'=> 'Song 2',
				'artist'=> 'Creator 2',
				'duration'=> 273,
				'song_key'=> 2,
			}
		]
	}
	JSON[initialInformation]


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
