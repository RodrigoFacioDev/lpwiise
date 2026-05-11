const pg = require('pg');
const { Client } = pg;
const connectionString = "postgresql://impact_user:impact_password@127.0.0.1:5432/impact_hub";
const client = new Client({ connectionString });

async function test() {
  try {
    await client.connect();
    console.log('Connected to DB on 5432');
    const res = await client.query('SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != \'pg_catalog\' AND schemaname != \'information_schema\';');
    console.log('Tables:', res.rows.map(r => r.tablename));
    await client.end();
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

test();
