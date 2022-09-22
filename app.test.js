const request = require('supertest');
const app = require('./app');

// unit test for GET endpoint to retrieve short URL
it('GET /url', () => {
    return request(app)
    .get('/api/url/?longUrl=http://www.twitter.com')
    .expect(200)
    .then((response) => {
        expect(response.body).toEqual(
            expect.objectContaining({
                url_code: expect.any(String),
                short_url: expect.any(String),
                long_url: expect.any(String),
            })
        )
    });
});