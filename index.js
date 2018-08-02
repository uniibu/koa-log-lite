function time(start) {
  let delta = Date.now() - start;
  return delta < 10000 ?
    `${delta.toLocaleString('en-US')}ms` :
    `${Math.round(delta / 1000).toLocaleString('en-US')}sec`;
}

function bytes(bd) {
  try {
    const len = typeof bd === 'string' ? bd.length : JSON.stringify(bd).length;
    return len < 1024 ? `${len.toLocaleString('en-US')}b` :
      `${(+(len / 1024).toFixed(2)).toLocaleString('en-US')}kb`;
  } catch (e) {
    return '0kb';
  }
}
module.exports = () => async function koaLogLite(ctx, next) {
  const start = Date.now();
  const print = `${ctx.method} ${ctx.originalUrl} | ${ctx.ip}`;
  try {
    console.log(`<-- ${print}`);
    await next();
    console.log(`--> ${print} ${ctx.status} ${time(start)} ${bytes(ctx.body)}`);
  } catch (err) {
    console.error(`${print} | ${err.stack || err.message}`);
    throw err;
  }
};