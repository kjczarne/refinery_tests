import { AndevFldsEngine } from '../../src/engines/andevFlashcards';
import { fullRecord } from '../core/fixtures';
import * as csv from 'fast-csv';
import { unlinkSync, readFileSync } from 'fs';
import * as assert from 'assert';
import { IRecord } from '../../src';
import { delay } from '../../src/utilities/utils';

var controller: AndevFldsEngine = new AndevFldsEngine();
console.log(process.env.REFINERY_USER)
describe("Testing AnDev Flashcards Egress", function () {

  before(async function () {
    await controller.recordsDb.db.put(fullRecord);
  });

  it("should match expected CSV row", async function () {
    await controller.export('temp.csv', 'default', 'myNotebook')
    let expectedContent = `${fullRecord.data[0]},${fullRecord.data[1]}\n`
    let actualContent = readFileSync('temp.csv', { encoding: 'utf-8' });
    assert.equal(expectedContent, actualContent)
  });

  it("should match expected CSV row for a flipped card", async function () {
    await controller.export('temp.csv', 'default', 'myNotebook', undefined, true)
    let expectedContent = `${fullRecord.data[1]},${fullRecord.data[0]}\n`
    let actualContent = readFileSync('temp.csv', { encoding: 'utf-8' });
    assert.equal(expectedContent, actualContent)
  });

  it("should have a non-empty `pastExports` Array", async function () {
    let record: IRecord = await controller.recordsDb.db.get(fullRecord._id);
    assert.notEqual(record.pastExports.length, 0);
  });

  after(async function () {
    await controller.recordsDb.db.destroy();
    unlinkSync('temp.csv');
    await delay(50);
  });
});