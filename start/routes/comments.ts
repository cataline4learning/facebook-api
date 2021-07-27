import Route from '@ioc:Adonis/Core/Route'

Route.resource('/comments', 'Comments/Main')
  .only(['store', 'update', 'destroy'])
  .middleware({
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth']
  })
