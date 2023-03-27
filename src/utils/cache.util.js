const redis = require('redis');
const { promisify } = require('util');

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const client = redis.createClient(REDIS_PORT, REDIS_HOST);

client.on('connect', () => {
  console.log('Connected to Redis server');
});

client.on('error', (error) => {
  console.error(`Error: ${error}`);
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

function get(key) {
  return getAsync(key)
    .then((data) => JSON.parse(data))
    .catch((error) => console.error(`Error: ${error}`));
}

function set(key, value, ttl = 60) {
  const data = JSON.stringify(value);
  client.setex(key, ttl, data);
}

function del(key) {
  client.del(key);
}

function flush() {
  client.flushall();
}

module.exports = { get, set, del, flush };
