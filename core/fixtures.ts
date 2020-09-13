import { IRecord } from "../../src/interfaces";
import { constructRecord } from "../../src/databaseWrapper";

/**
 * minimal IRecord instance (no optional fields are set)
 */
export let minimalRecord: IRecord = {
  dataField1: "lorem ipsum",
  dataField2: "dolor set amet",
  _id: 'lorem',
  timestampCreated: Date.now(),
  timestampModified: Date.now(),
  source: 'source',
  batch: 'default',
  pastExports: new Array<number>(),
  flashcard: {
    scheduler: {
      easinessFactor: 2.5,
      pastRevisions: new Array<number>(),
      nextRevision: Date.now()
    }
  }
}

export let fullRecord: IRecord = {
  dataField1: "lorem ipsum",
  dataField2: "dolor set amet",
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

export let fromConstructRecord: IRecord = constructRecord(
  'lorem ipsum',
  'dolor set amet',
  'source',
  'default',
  'myNotebook'
)
