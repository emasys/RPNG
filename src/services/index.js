import { writeFile, readFile, createFile } from '../utils';

class GenerateNumber {
  constructor(h, path) {
    this.h = h;
    this.listOfNumbers = [];
    this.latestNumber = 0;
    this.filePath = path;
    this.prepend = process.env.PREPEND;
    this.retries = 0;
    createFile(path);
  }

  generateNumber() {
    const rand = Math.random();
    const str = rand.toString();
    const num = str.slice(2, 8);
    this.latestNumber = this.prepend + num;
  }

  async getAllNumbers() {
    return readFile(this.filePath);
  }

  async generateRandomNumbers() {
    this.generateNumber();
    const initialList = await this.getAllNumbers();
    this.listOfNumbers = initialList.split('\n');
    return this.checkDuplicate();
  }

  checkDuplicate() {
    const isDuplicate = this.listOfNumbers.find(
      prevNum => prevNum === this.latestNumber,
    );
    /* istanbul ignore next */
    if (isDuplicate) {
      this.retries += 1;
      if (this.retries > 10) {
        return this.h
          .response({
            message: 'Please change the prepend value and try again',
          })
          .code(409);
      }
      return this.generateRandomNumbers();
    }
    return this.printNumber();
  }

  async printNumber() {
    const phoneNumber = `${this.latestNumber}\n`;
    await writeFile(this.filePath, phoneNumber);
    return this.h
      .response({
        'recently added': this.latestNumber,
      })
      .code(201);
  }
}

export default GenerateNumber;
