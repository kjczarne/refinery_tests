import { IRecord } from "../../src/interfaces";
import { Record } from "../../src/record";

/**
 * minimal IRecord instance (no optional fields are set)
 */
export let minimalRecord: IRecord = {
  data: ["lorem ipsum", "dolor set amet"],
  _id: 'lorem',
  timestampCreated: Date.now(),
  timestampModified: Date.now(),
  source: 'source',
  batch: 'default',
  pastExports: new Array<number>()
}

export let fullRecord: IRecord = {
  data: ["lorem ipsum", "dolor set amet"],
  _id: 'lorem',
  timestampCreated: Date.now(),
  timestampModified: Date.now(),
  richContent: '',
  source: 'source',
  batch: 'default',
  pastExports: new Array<number>(), 
  flashcard: {
    scheduler: {
      easinessFactor: 2.5,
      pastRevisions: new Array<number>(),
      nextRevision: Date.now()
    }
  },
  notebook: 'myNotebook'
}

export let fromConstructRecord: Record = new Record(
  ['lorem ipsum',
  'dolor set amet'],
  'source',
  'default',
  'myNotebook'
)
