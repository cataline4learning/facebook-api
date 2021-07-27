import Route from '@ioc:Adonis/Core/Route'

Route.post('/messages', 'Messages/Main.store').middleware('auth')
