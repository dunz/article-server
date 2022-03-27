'use strict';

/**
 *  article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) =>  ({
  async create(ctx) {
    ctx.request.body.data.user = ctx.state.auth.credentials.id
    const entity = await strapi.service('api::article.article').create(ctx.request.body)
    return this.sanitizeOutput(entity, ctx);
    // const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    // return this.transformResponse(sanitizedEntity);

    // const response = await super.create(ctx);
    // return response;
  },
  async update(ctx) {
    const { id } = ctx.params;
    const article = await strapi.service('api::article.article').findOne(id)

    if(!article) {
      return ctx.throw(404)
    }
    if(ctx.request.body.data.user) {
      return ctx.throw(400, 'user field cannot be changed')
    }
    // if(ctx.state.auth.credentials.id !== article.user.id) {
    //   return ctx.unauthorized(`You can't update this entity`)
    // }
    const entity = await strapi.service('api::article.article').update(id, ctx.request.body)
    return this.sanitizeOutput(entity, ctx);
  },
  async delete(ctx) {
    const { id } = ctx.params;
    const article = await strapi.service('api::article.article').findOne(id)
    if(!article) {
      return ctx.throw(404)
    }
    // if(ctx.state.auth.credentials.id !== article.user.id) {
    //   return ctx.unauthorized(`You can't update this entity`)
    // }
    const entity = await strapi.service('api::article.article').delete(id)
    return this.sanitizeOutput(entity, ctx);
  }
}));
