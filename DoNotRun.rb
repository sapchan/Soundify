#for inserting Vincent's music data
require 'sequel'
require 'SecureRandom'

DB = Sequel.connect(:adapter => 'mysql2', :user => 'soundify', :password=>'tomozpan', :host => 'soundify.ccj707h8lkgk.us-east-1.rds.amazonaws.com', :database => 'soundify')

lorde = SecureRandom.uuid
vw = SecureRandom.uuid
abba = SecureRandom.uuid

pureheroine = SecureRandom.uuid
melodrama = SecureRandom.uuid
vampweek = SecureRandom.uuid
contra = SecureRandom.uuid
mvotc = SecureRandom.uuid
gold = SecureRandom.uuid


artists=[{:ar_id => lorde, :name => "Lorde", :description => "New Zealand singer, songwriter, and record producer who holds both New Zealand and Croatian citizenship."},
        {:ar_id => vw, :name => "Vampire Weekend", :description => "American rock band from New York City, formed in 2006."},
        {:ar_id => abba, :name => "ABBA", :description => "Swedish pop group, formed in Stockholm in 1972 by members Agnetha Fältskog, Björn Ulvaeus, Benny Andersson, and Anni-Frid Lyngstad: the group name derived from the first letter in their names."}]

albums=[{:al_id => pureheroine, :title => "Pure Heroine", :ar_id => lorde, :date => 2013},
        {:al_id => melodrama, :title => "Melodrama", :ar_id => lorde, :date => 2017},
        {:al_id => vampweek, :title => "Vampire Weekend", :ar_id => vw, :date => 2008},
        {:al_id => contra, :title => "Contra", :ar_id => vw, :date => 2010},
        {:al_id => mvotc, :title => "Modern Vampires of the City", :ar_id => vw, :date => 2013},
        {:al_id => gold, :title => "Gold: Greatest Hits", :ar_id => abba, :date => 2002}]

songs= [{:so_id => SecureRandom.uuid, :title => "400 Lux", :ar_id => lorde, :al_id => pureheroine, :popularity => 0.8, :link => "www.google.com", :genre => "Alternative"},
        {:so_id => SecureRandom.uuid, :title => "Royals", :ar_id => lorde, :al_id => pureheroine, :popularity => 0.4, :link => "www.google.com", :genre => "Alternative"},
        {:so_id => SecureRandom.uuid, :title => "The Luvre", :ar_id => lorde, :al_id => melodrama, :popularity => 0.85, :link => "www.google.com", :genre => "Alternative"},
      {:so_id => SecureRandom.uuid, :title => "Green Light", :ar_id => lorde, :al_id => melodrama, :popularity => 0.75, :link => "www.google.com", :genre => "Alternative"},
    {:so_id => SecureRandom.uuid, :title => "Walcott", :ar_id => vw, :al_id => vampweek, :popularity => 0.91, :link => "www.google.com", :genre => "Alternative"},
  {:so_id => SecureRandom.uuid, :title => "Oxford Comma", :ar_id => vw, :al_id => vampweek, :popularity => 0.92, :link => "www.google.com", :genre => "Alternative"},
{:so_id => SecureRandom.uuid, :title => "M79", :ar_id => vw, :al_id => vampweek, :popularity => 0.94, :link => "www.google.com", :genre => "Alternative"},
{:so_id => SecureRandom.uuid, :title => "Contra", :ar_id => vw, :al_id => contra, :popularity => 0.89, :link => "www.google.com", :genre => "Alternative"},
{:so_id => SecureRandom.uuid, :title => "White Sky", :ar_id => vw, :al_id => contra, :popularity => 0.87, :link => "www.google.com", :genre => "Alternative"},
{:so_id => SecureRandom.uuid, :title => "Obvious Bicycle", :ar_id => vw, :al_id => mvotc, :popularity => 0.89, :link => "www.google.com", :genre => "Alternative"},
{:so_id => SecureRandom.uuid, :title => "Don\\'t Lie", :ar_id => vw, :al_id => mvotc, :popularity => 0.96, :link => "www.google.com", :genre => "Alternative"},
{:so_id => SecureRandom.uuid, :title => "Dancing Queen", :ar_id => abba, :al_id => gold, :popularity => 0.95, :link => "www.google.com", :genre => "Alternative"},
{:so_id => SecureRandom.uuid, :title => "Mamma Mia", :ar_id => abba, :al_id => gold, :popularity => 0.94, :link => "www.google.com", :genre => "Alternative"}]

DB.run("DELETE FROM Artist")


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
