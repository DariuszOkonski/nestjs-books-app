export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '12h',
  },
});
