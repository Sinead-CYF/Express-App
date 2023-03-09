const { getClient } = require('./get-client');

(async () => {
  const client = await getClient();
  const entries = await client.query('SELECT * FROM cities');
  console.log(`Database entries ${entries.rowCount} row(s)`);
  await client.end();
})();