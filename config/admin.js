module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '66855cf802cd4b10cf61bc5b7bc44dc3'),
  },
});
