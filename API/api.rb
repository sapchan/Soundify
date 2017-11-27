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
get '/queue' do

	queue = {
		'queue': [
			{
				'title'=> 'Song 1',
				'artist'=> 'Creator 1',
				'artist_id' => 890,
				'duration'=> 132,
				'song_key'=> 1
			},
			{
				'title'=> 'Song 2',
				'artist'=> 'Creator 2',
				'artist_id' => 950,
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
				'artist_id' => 890,
				'duration'=> 132,
				'song_key'=> 1
			},
			{
				'title'=> 'Song 2',
				'artist'=> 'Creator 2',
				'artist_id' => 950,
				'duration'=> 273,
				'song_key'=> 2,
			}
		],
		'artist_info':[
			{
		      'Name'=> 'name',
		      'artist_id' => 0,
		      'Description'=> 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis hendrerit ipsum, at maximus est. Maecenas consequat consectetur orci, in laoreet dolor gravida in. Cras suscipit semper ex, eget consequat libero interdum ac. Nam sed posuere ligula. Vivamus vel sem ut neque imperdiet congue. Quisque ac dolor a risus laoreet elementum. Duis lacinia risus odio, ac varius mi sagittis sit amet. Vestibulum ut diam fringilla, maximus libero eget, tincidunt nulla. Integer eleifend odio et elementum pretium. Nulla id erat vulputate, volutpat mi at, consequat magna. Vestibulum id dolor in tellus lobortis porta. Mauris a pulvinar felis, euismod bibendum urna. Proin ac magna interdum, suscipit tortor ac, faucibus erat.',
		      'Albums'=> [
		        {
		          'album_title' => 'album 1',
		          'songs' => [{
		              'songName' => 'Song 1',
		              'song_key' => 0,
		              'duration' => 0
		              }]
		          }]
		    }]
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
