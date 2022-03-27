module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/articles/:articleId/comments',
      handler: 'comment.create',
    },
    {
      method: 'GET',
      path: '/articles/:articleId/comments',
      handler: 'comment.find',
    },
    {
      method: 'PUT',
      path: '/articles/:articleId/comments/:id',
      handler: 'comment.update',
    },
    {
      method: 'DELETE',
      path: '/articles/:articleId/comments/:id',
      handler: 'comment.delete',
    },
  ]
}
