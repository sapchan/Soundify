# api.rb
require 'sinatra'
require 'sequel'

DB = Sequel.connect(:adapter => 'mysql2', :user => 'soundify', :password=>'tomozpan', :host => 'soundify.ccj707h8lkgk.us-east-1.rds.amazonaws.com', :database => 'soundify')

before do
	response.headers['Access-Control-Allow-Origin'] = '*'
end

get '/playlist/:pl_id' do
    'get request for playlist with id ' + params['pl_id']
end

post '/something_secure/' do # someome submits a form to /something_secure using post
    # there's a field in a form where the name in the form tag is post_from_html_key
    puts params['post_from_html_key'] # <input type="password" name="post_from_html_key" />
    # puts prints stuff out to the serve console, nothing is returned to the user
    # if you want to return something, do:
    json {'keyyy': 'a test value'} # send a hash (dict) over json
end