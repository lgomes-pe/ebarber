module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'a8030ccd9dbf8921b242bd63ffaf736d'),
  },
});
