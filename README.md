# Quasar Strapi Starter

A starter project in Quasar for Strapi.

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## Strapi

### Install Strapi localy to test the frontend.

```bash
yarn create strapi-app strapi-test --quickstart
```

### Start Strapi in development mode

```bash
yarn develop
```

### Nodemailer

Nodemailer is required if you want to test the forgot password functionality.

See [Nodemailer (Strapi plugin)](https://market.strapi.io/providers/@strapi-provider-email-nodemailer).
