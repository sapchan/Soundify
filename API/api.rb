# api.rb
require 'sinatra'

before do
	response.headers['Access-Control-Allow-Origin'] = '*'
end

get '/test' do
	'yo'
end

get '/playlist/:pl_id' do
	"hello #{params['pl_id']}!"
end
