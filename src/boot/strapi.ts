import Strapi from 'strapi-sdk-js';

const strapi = new Strapi({
  store: {
    key: 'strapi_jwt',
    useLocalStorage: true,
    cookieOptions: { path: '/' },
  },
});

export { strapi };
