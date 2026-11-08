// "Review a repo" puts owner and name into a GitHub URL with the visitor's token: bad values must never get that far.
const { test, after } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const makeRouter = require('../src/backend/routes/api.js');

let called = false;
global.fetch = async () => { called = true; throw new Error('must not reach GitHub'); };
const app = express();
app.use(makeRouter({ getSessionById: async () => null }, (req, res, next) => next()));
const server = app.listen(0);
after(() => { server.closeAllConnections(); server.close(); });
const get = q => new Promise((ok, fail) => require('http').get(`http://127.0.0.1:${server.address().port}/api/review?${q}`, r => ok(r.statusCode)).on('error', fail));

test('owner or name of "." / ".." or with slashes is refused before any GitHub call', async () => {
    for (const q of ['owner=..&name=user', 'owner=a&name=..', 'owner=a&name=.', 'repo=../user', 'owner=a%2Fb&name=c', 'owner=-bad&name=x', 'owner=a&name=x%2F..%2Fy']) {
        assert.strictEqual(await get(q), 400, q);
    }
    assert.strictEqual(called, false);
});
