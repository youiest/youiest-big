console.log " hi from unionize server "



# ---
# generated by js2coffee 2.0.0

@getUsername = ->
  'server'
@testReverse = -># send something to that which is created by me
  @vv = w.documents.insert
    from: 'USER'
    to: 'youiest'
    creator: 'w'
    _idd: 'USER-youiest-w'
    username: 'future'

  @v = w.documents.insert
    from: 'present'
    body: 'this should trigger an incoming to username:future'
    to: 'future'
    creator: 'me'
    _idd: 'present-future-me'

  

  @vvv = w.documents.findOne
    incoming: 'present-future-me'

  @vvvv = w.documents.findOne({username: 'future'})


  @incoming = w.documents.findOne({ username: 'future' }).incoming
  
  console.log 'anyone got incoming?' , vvv , vvvv , incoming


#testReverse()

@future = ->
  x = w.documents.findOne
    username: 'future'
  console.log x

Meteor.setTimeout(testReverse, 4000)
Meteor.setTimeout(future, 5000)


###

User.Meta.collection._ensureIndex
  username: 1

app.getUsername = ->
  username = ""
  unless Meteor.username() return this.userId
###

