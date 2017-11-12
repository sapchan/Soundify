require 'sqlite3'

db = SQLite3::Database.new('test.db')

rows = db.execute <<-SQL
          create table users(
           id int,
           name varchar(30)
         );
        SQL

puts rows
puts rows.inspect
