import Route from '@ioc:Adonis/Core/Route'

Route.get('/conversations', 'Conversations/Main.index').middleware('auth')
Route.get('/conversations/:id', 'Conversations/Main.show').middleware('auth')
