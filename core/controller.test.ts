import * as assert from 'assert';
import { FlashcardRevisionController } from '../../src/controller';
import { fullRecord } from './fixtures';
import { IRecord } from '../../src/interfaces';
import { consoleDisplayCallback } from '../../src/utils';
import { config } from '../../src/configProvider';
import _, { over } from 'lodash';

let overdue: IRecord = Object.assign(this, fullRecord);
if (overdue.flashcard !== undefined && overdue.flashcard.scheduler !== undefined) {
  overdue.flashcard.scheduler.nextRevision = Date.now() - 60000;
}

let controller: FlashcardRevisionController = new FlashcardRevisionController();

let configObj: any = config();

let dateDiffThreshold: number = 1000;  // 1 sec

describe("Test Flashcard Controller", function () {

  before(async function () {
    await controller.recordsDb.db.put(overdue);
  });

  describe("Session start", function () {
    it("should set the date of session start and flip `sessionOn` to true", function () {
      controller.startSession();
      assert.equal(controller.sessionOn, true);
      let x: number = 3 * dateDiffThreshold;  // make it much larger if value undefined
      if (controller.sessionStart !== undefined) {
        x = controller.sessionStart.valueOf();
      }
      assert.equal(Math.abs(x - Date.now()) < dateDiffThreshold, true);
    });
  });

  describe("\`getScheduledFlashcards\` function", function () {
    it("should correctly return overdue flashcards", async function () {
      let flashcards = await controller.getScheduledFlaschcards();
      let flashcard: any = {}
      if (flashcards !== undefined) {
        flashcard = flashcards[0]
      }
      // revision property needs to be removed from the flashcard to compare
      let { _rev, ...tailoredFlashcard } = flashcard;
      assert.equal(_.isEqual(tailoredFlashcard, overdue), true);
    });
  });

  describe("\`askFlashcard\` function", function () {
    it("should return starting timestamp for a flashcard", function () {
      let end = controller.askFlashcard(overdue, 'dataField1', consoleDisplayCallback)
      assert.equal(Math.abs(end - Date.now()) < dateDiffThreshold, true);
    });
  });

  describe("\`showAnswer\` function", function () {
    it("should return ending timestamp for a flashcard", function () {
      let end = controller.showAnswer(overdue, 'dataField2', consoleDisplayCallback)
      assert.equal(Math.abs(end - Date.now()) < dateDiffThreshold, true);
    });
  });

  describe("\`answerToFlashcard\` function", function () {
    it("should add IRecord to \`asweredStack\`", function () {
      controller.answerToFlashcard(overdue, 4);
      assert.equal(overdue._id, controller.answeredStack[0]._id);
      assert.equal(overdue._rev, controller.answeredStack[0]._rev);
    });
  });

  describe("Session end", function () {
    it("should set the date of session end and flip `sessionOn` to false", function () {
      controller.endSession();
      assert.equal(controller.sessionOn, false);
      let x: number = 3 * dateDiffThreshold;  // make it much larger if value undefined
      if (controller.sessionEnd !== undefined) {
        x = controller.sessionEnd.valueOf();
      }
      assert.equal(Math.abs(x - Date.now()) < dateDiffThreshold, true);
    });
  });

  after(async function () {
    await controller.recordsDb.db.destroy();
  });
});