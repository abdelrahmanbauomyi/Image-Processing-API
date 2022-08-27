import app from '../servers';
import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
const request = supertest(app);
fdescribe('Test of /api endpoints responses ', () => {
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
});
fdescribe('Test for image proccessing ', () => {
  it('the  resize function creates creats an img', async () => {
    const filename = 'santamonica';
    const width = 1080;
    const height = 720;
    await sharp(path.resolve(`./imgs/${filename}.jpg`))
      .resize({
        width: width, //assign new width
        height: height, //assign new hight
      })
      .toFile(path.resolve(`./cached/${filename}${width}${height}.jpg`));
    expect(
      fs.existsSync(path.resolve(`./cached/${filename}${width}${height}.jpg`))
    ).toBeTrue();
  });
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
