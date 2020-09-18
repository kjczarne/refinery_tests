import assert from 'assert';
import { sqlSchema, sqlQueryRun, queryPrepare } from 'refinery-core';
import { logger, delay } from 'refinery-core';
import { dedent } from 'ts-dedent';
import { AppleiBooksEngine } from 'refinery-core';
import { promises as fs, readFileSync } from 'fs';

let iBooksDbPath: string = './tests/res/ibooks/ibooks_db_mock.sqlite';
let iBooksSchemaPath: string = './tests/res/ibooks/ibooks_db_mock_schema.sql';
let iBooksLibraryDbPath: string = './tests/res/ibooks/ibooks_library_mock.sqlite';
let iBooksLibrarySchemaPath: string = './tests/res/ibooks/ibooks_library_mock_schema.sql';

let iBooksEngine = new AppleiBooksEngine();

describe("Testing iBooks -> RefineryDB", function () {
  before(async function () {
    // create fake iBooks dbs:
    let steps: Array<Promise<any>> = [
      // create database files so connection can be established:
      fs.writeFile(iBooksDbPath, ''),
      fs.writeFile(iBooksLibraryDbPath, ''),
      sqlSchema(iBooksDbPath,
        readFileSync(iBooksSchemaPath).toString()),
      sqlQueryRun(iBooksDbPath,
        queryPrepare(dedent`insert into ZAEANNOTATION values(
                    1,1,1,0,1,3,3,0,1,1,607716201.000000,607716201.000000,
                    'blah-blah','blah-blah','some-cfi','lorem ipsum','',
                    'dolor set amet','some-uuid', ${"\' \',".repeat(13)} ' '
                );`), 'run'),
      sqlSchema(iBooksLibraryDbPath,
        readFileSync(iBooksLibrarySchemaPath).toString()),
      sqlQueryRun(iBooksLibraryDbPath,
        queryPrepare(dedent`insert into ZBKLIBRARYASSET values(
                    ${"1,".repeat(37)}
                    607716201.000000,
                    0.0,
                    ${'607716201.000000,'.repeat(3)}
                    0.0,
                    ${'607716201.000000,'.repeat(7)}
                    0.0,
                    ${'607716201.000000,'.repeat(2)}
                    0.0,
                    ' ',
                    'blah-blah',
                    ${"\' \',".repeat(25)}
                    'lorem ipsum book title',
                    ' ', ' '
                );`), 'run')
    ]
    let x = await steps.reduce(async (prev, next) => {
      try {
        let p = await prev;
        logger.log({
          level: 'silly',
          message: `"Before" query response: ${p}`
        });
        return next;

      }
      catch (err) {
        logger.log({
          level: "error",
          message: `Test error, promise rejected, reason: ${err}`
        });
      }
    }, Promise.resolve([]));
    return x;
  });
  it(`should pass if a book is inserted into RefineryDb
        and corresponding ID can be found`, async function () {
    // load event is supposed to load book by title into RefineryDB:
    let docId = await iBooksEngine.load('lorem ipsum book title', 'default');
    var response = undefined
    try {
      await delay(100);  // CouchDb is "eventually consistent", cannot expect update to happen within microseconds
      response = await iBooksEngine.recordsDb.db.get(docId[0]);

    } catch (err) {
      logger.log({
        level: 'error',
        message: `Cannot GET: ${JSON.stringify(err)}, document ID: ${docId}`
      })
    }
    assert.notEqual(response, undefined);
  });
  after(async function () {
    await fs.unlink(iBooksDbPath);
    await fs.unlink(iBooksLibraryDbPath);
    await iBooksEngine.recordsDb.db.destroy();
    await delay(50);
  });
});
