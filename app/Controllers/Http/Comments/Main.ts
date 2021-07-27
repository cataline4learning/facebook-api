import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/Comment/Main'
import { Post, Comment } from 'App/Models'

export default class CommentsController {
  public async store({ request, auth }: HttpContextContract) {
    const { content, postId } = await request.validate(StoreValidator)

    const post = await Post.findOrFail(postId)

    const comment = await post.related('comments').create({ content, userId: auth.user!.id })

    return comment
  }

  public async update({ request, response, auth, params }: HttpContextContract) {
    const { content } = await request.validate(UpdateValidator)

    const comment = await Comment.findOrFail(params.id)

    if (auth.user!.id !== comment.userId) {
      return response.unauthorized()
    }

    comment.merge({ content })

    await comment.save()

    return comment
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    const comment = await Comment.findOrFail(params.id)

    if (auth.user!.id !== comment.userId) {
      return response.unauthorized()
    }

    await comment.delete()
  }
}
