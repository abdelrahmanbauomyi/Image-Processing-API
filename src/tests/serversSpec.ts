import app from '../servers';
import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
const request = supertest(app);
describe('Test of /api endpoints responses ', () => {
  it('gets the api endpoint ', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  it(' gets the api/imgs endpoint', async () => {
    const response = await request.get('/api/imgs');
    expect(response.status).toBe(200);
  });
  it(" gets the api/imgs endpoint with a query that doesn't work", async () => {
    const response = await request.get(
      '/api/imgs?filename=santnica.jpg&width=190&height=173'
    );
    // expect(response.status).toBe(200)
    expect(response.type).toBe('text/html');
  });
  it(' gets the api/imgs endpoint with a query that work', async () => {
    const response = await request.get(
      '/api/imgs?filename=santamonica&width=1920&height=1252'
    );
    expect(response.type).toBe('image/jpeg');
  });
  it(" doesn't get the img endpoint", async () => {
    const response = await request.get('/imgs');
    expect(response.status).not.toBe(200);
  });
  afterAll(() => {
    //to empty
    fs.readdir(path.resolve(`./cached`), (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(path.resolve(`./cached`), file), (err) => {
          if (err) throw err;
        });
      }
    });
  });
});
