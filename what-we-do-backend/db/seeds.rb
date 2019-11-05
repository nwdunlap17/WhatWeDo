# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


u1 = User.create({username: 'Alice'})
u2 = User.create({username: 'Bob'})
u3 = User.create({username: 'Claire'})
u4 = User.create({username: 'David'})
u5 = User.create({username: 'Eve'})
print 'Users Created'

c1 = Content.create({title: 'Peter Pan'})
c2 = Content.create({title: 'Spirited Away'})
c3 = Content.create({title: 'Battleship'})
c4 = Content.create({title: 'Judge Dredd'})
c5 = Content.create({title: 'Cloudy with a chance of meatballs'})
c6 = Content.create({title: 'Hook'})
c7 = Content.create({title: 'Angels in the outfield'})
c8 = Content.create({title: 'Chinatown'})
print 'Content Created'

u1.contents << c1
u2.contents << c1
u3.contents << c1
u4.contents << c1
u5.contents << c6
u1.contents << c3
u2.contents << c4
u3.contents << c5
u4.contents << c7
u5.contents << c8
u1.contents << c5
u2.contents << c2
u3.contents << c2
u4.contents << c8
u5.contents << c3

print 'added content to users'

g1 = Group.create({title: 'boys'})
g1.users << u2
g1.users << u4
g2 = Group.create({title: 'girls'})
g2.users << u1
g2.users << u3
g2.users << u5
g3 = Group.create({title: 'ABE'})
g3.users << u1
g3.users << u2
g3.users << u5

print 'Added users to groups'
#test 