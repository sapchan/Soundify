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
