# api.rb

require 'sinatra'

get '/test' do
	response['Access-Control-Allow-Origin'] = '*'
	'test'
end

get '/playlist/#pl_id' do
	response['Access-Control-Allow-Origin'] = '*'
	
end
