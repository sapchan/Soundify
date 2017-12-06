#for inserting Vincent's music data
require 'sequel'
require 'SecureRandom'

DB = Sequel.connect(:adapter => 'mysql2', :user => 'soundify', :password=>'tomozpan', :host => 'soundify.ccj707h8lkgk.us-east-1.rds.amazonaws.com', :database => 'soundify')

bb = SecureRandom.uuid
killers = SecureRandom.uuid
tame = SecureRandom.uuid

hits = SecureRandom.uuid
battle = SecureRandom.uuid
dayage = SecureRandom.uuid
currents = SecureRandom.uuid
lonerism = SecureRandom.uuid


artists=[{:ar_id => bb, :name => "The Beach Boys", :description => "American rock band formed in Hawthorne, California, in 1961. The group\\'s original lineup consisted of brothers Brian, Dennis, and Carl Wilson; their cousin Mike Love; and their friend Al Jardine. Distinguished by their vocal harmonies and early surf songs, they are one of the most influential acts of the rock era."},
        {:ar_id => killers, :name => "The Killers", :description => " American rock band formed in Las Vegas, Nevada, in 2001 by members Brandon Flowers (lead vocals, keyboards, bass) and Dave Keuning (lead guitar, backing vocals). The band\\'s name is derived from a logo on the bass drum of a fictitious band, portrayed in the music video for the New Order song Crystal."},
        {:ar_id => tame, :name => "Tame Impala", :description => "Australian psychedelic rock band founded by Kevin Parker in 2007. The group began as a home recording project for Parker, who writes, records, performs, and produces the music."}]

albums=[{:al_id => hits, :title => "Greatest Hits", :ar_id => bb, :date => 1990},
        {:al_id => battle, :title => "Battle Born", :ar_id => killers, :date => 2012},
        {:al_id => dayage, :title => "Day and Age", :ar_id => killers, :date => 2008},
        {:al_id => currents, :title => "Currents", :ar_id => tame, :date => 2015},
        {:al_id => lonerism, :title => "Lonerism", :ar_id => tame, :date => 2013}]

songs= [{:so_id => SecureRandom.uuid, :title => "Surfin\\' U.S.A.", :ar_id => bb, :al_id => hits, :popularity => 0.96, :link => "www.google.com", :genre => "Rock"},
        {:so_id => SecureRandom.uuid, :title => "Good Vibrations", :ar_id => bb, :al_id => hits, :popularity => 0.88, :link => "www.google.com", :genre => "Rock"},
        {:so_id => SecureRandom.uuid, :title => "Help Me Rhonda", :ar_id => bb, :al_id => hits, :popularity => 0.85, :link => "www.google.com", :genre => "Rock"},
        {:so_id => SecureRandom.uuid, :title => "Miss Atomic Bomb", :ar_id => killers, :al_id => battle, :popularity => 0.75, :link => "www.google.com", :genre => "Alternative"},
        {:so_id => SecureRandom.uuid, :title => "From Here On Out", :ar_id => killers, :al_id => battle, :popularity => 0.91, :link => "www.google.com", :genre => "Alternative"},
        {:so_id => SecureRandom.uuid, :title => "Human", :ar_id => killers, :al_id => dayage, :popularity => 0.99, :link => "www.google.com", :genre => "Alternative"},
        {:so_id => SecureRandom.uuid, :title => "Spaceman", :ar_id => killers, :al_id => dayage, :popularity => 0.94, :link => "www.google.com", :genre => "Alternative"},
        {:so_id => SecureRandom.uuid, :title => "The Less I Know The Better", :ar_id => tame, :al_id => currents, :popularity => 0.97, :link => "www.google.com", :genre => "Alternative"},
        {:so_id => SecureRandom.uuid, :title => "Love/Paranoia", :ar_id => tame, :al_id => currents, :popularity => 0.87, :link => "www.google.com", :genre => "Alternative"},
        {:so_id => SecureRandom.uuid, :title => "New Person, Same Old Mistakes", :ar_id => tame, :al_id => currents, :popularity => 0.89, :link => "www.google.com", :genre => "Alternative"},
        {:so_id => SecureRandom.uuid, :title => "Feels Like We Only Go Backwards", :ar_id => tame, :al_id => lonerism, :popularity => 0.96, :link => "www.google.com", :genre => "Alternative"},
        {:so_id => SecureRandom.uuid, :title => "Barbara Ann", :ar_id => bb, :al_id => hits, :popularity => 0.95, :link => "www.google.com", :genre => "Rock"},
        {:so_id => SecureRandom.uuid, :title => "Fun Fun Fun", :ar_id => bb, :al_id => hits, :popularity => 0.94, :link => "www.google.com", :genre => "Rock"}]

#DB.run("DELETE FROM Artist")


artists.each do |a|
  puts a[:name]
  DB.run("INSERT INTO Artist (ar_id, name, description) VALUES ( '#{a[:ar_id]}', '#{a[:name]}', '#{a[:description]}')")
end

albums.each do |a|
  puts a[:title]
  DB.run("INSERT INTO Album (al_id, title, ar_id, date) VALUES ( '#{a[:al_id]}', '#{a[:title]}', '#{a[:ar_id]}', #{a[:date]} ) " )
end

songs.each do |a|
  puts a[:title]
  DB.run("INSERT INTO Song (so_id, title, al_id, popularity, link, genre) VALUES ( '#{a[:so_id]}', '#{a[:title]}', '#{a[:al_id]}', #{a[:popularity]}, '#{a[:link]}', '#{a[:genre]}' )")
end
