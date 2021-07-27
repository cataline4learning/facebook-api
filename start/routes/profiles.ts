import Route from '@ioc:Adonis/Core/Route'

Route.get('/profiles', 'Profiles/Main.show').middleware('auth')
