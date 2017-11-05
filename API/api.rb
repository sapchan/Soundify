# api.rb

require 'sinatra'

get '/test' do
	response['Access-Control-Allow-Origin'] = '*'
	'test'
end
