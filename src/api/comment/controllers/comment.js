'use strict';

/**
 *  comment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::comment.comment', ({strapi}) => ({
  async create(ctx) {
    ctx.request.body.data.user = ctx.state.auth.credentials.id
    const { articleId } = ctx.params
    ctx.request.body.data.article = articleId;

    const article = await strapi.service('api::article.article').findOne(articleId)

    if(!article) {
      return ctx.throw(404)
    }
    const entity = await strapi.service('api::comment.comment').create(ctx.request.body)
    return this.sanitizeOutput(entity, ctx);
  },
  async find(ctx) {
    const entities = await strapi.service('api::comment.comment').find({
      article: ctx.params.articleId
    })
    return Promise.all(entities.results.map((entity) => this.sanitizeOutput(entity, ctx)))
  },
  async update(ctx) {
    const { articleId, id } = ctx.params;
    const comment = await strapi.service('api::comment.comment').findOne(id, {
      article: articleId,
    })
    if(!comment) {
      return ctx.throw(404)
    }
    if(ctx.request.body.data.article || ctx.request.body.data.user) {
      return ctx.throw(400, 'article or user field cannot be changed')
    }
    // if(ctx.state.auth.credentials.id !== comment.user.id) {
    //   return ctx.unauthorized(`You can't update this entry`)
    // }
    const entity = await strapi.service('api::comment.comment').update(id, ctx.request.body)
    return this.sanitizeOutput(entity, ctx);
  },
  async delete(ctx) {
    const { articleId, id } = ctx.params;
    const comment = await strapi.service('api::comment.comment').findOne(id, {
      article: articleId,
    })
    if(!comment) {
      return ctx.throw(404)
    }
    // if(ctx.state.auth.credentials.id !== comment.user.id) {
    //   return ctx.unauthorized(`You can't update this entry`)
    // }
    const entity = await strapi.service('api::comment.comment').delete(id)
    return this.sanitizeOutput(entity, ctx);
  }
}));
