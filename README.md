# koa-log-lite
Simple and lightweight api request logging based on koa-logger

## Install
`npm install koa-log-lite` or `yarn add koa-log-lite`

## Usage
```js
const Koa = require('koa');
const loglite = require('koa-logger-lite');
const app = new Koa();

app.use(loglite());
```