import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

inquirer
  .prompt([{ message: 'Enter a URL to make a QR code: ', name: 'url' }])
  .then((answers) => {
    let url = answers.url;
    let qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream(`${uuidv4()}.png`));

    if (!url.includes('https://') && !url.includes('http://')) {
        url = `http://${url}`;
    }

    const textFile = url.replace(/(^\w+:|^)\/\//, '').split('.')[0];

    fs.writeFile(`${textFile}.txt`, url, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    `Something went wrong: ${error}`
  });
