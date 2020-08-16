import { AndevFldsEngine } from '../../src/handlers/andevFlashcards';
import { fullRecord } from '../core/fixtures';
import * as csv from 'fast-csv';
import { unlinkSync, readFileSync } from 'fs';
import * as assert from 'assert';

var controller: AndevFldsEngine = new AndevFldsEngine();

describe("Testing AnDev Flashcards Egress", function(){

    before(async function(){
        await controller.recordsDb.db.put(fullRecord);
    });

    it("should match expected CSV row", async function(){
        await controller.export('temp.csv', 'default', 'myNotebook')
        let expectedContent = `${fullRecord.dataField1},${fullRecord.dataField2}\n`
        let actualContent = readFileSync('temp.csv', { encoding: 'utf-8' });
        assert.equal(expectedContent, actualContent)
    });

    it("should match expected CSV row for a flipped card", async function(){
        await controller.export('temp.csv', 'default', 'myNotebook', '', true)
        let expectedContent = `${fullRecord.dataField2},${fullRecord.dataField1}\n`
        let actualContent = readFileSync('temp.csv', { encoding: 'utf-8' });
        assert.equal(expectedContent, actualContent)
    });

    after(async function(){
        await controller.recordsDb.db.destroy();
        unlinkSync('temp.csv');
    });
});