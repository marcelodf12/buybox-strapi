module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: process.env.BB_BD_PRODUCT_HOST,
        port: parseInt(process.env.BB_BD_PRODUCT_PORT),
        database: process.env.BB_BD_PRODUCT_NAME,
        username: process.env.BB_BD_PRODUCT_USER,
        password: process.env.BB_BD_PRODUCT_PASS
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
