import { IRecord } from "../../src/interfaces";
import { constructRecord, RefineryDatabaseWrapper } from "../../src/engine";

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
    flashcard: {
        easinessFactor: 2.5,
        deck: 'default',
        scheduler: {
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
    flashcard: {
        easinessFactor: 2.5,
        deck: 'default',
        scheduler: {
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
    undefined,
    undefined,
    'default',
    'myNotebook'
)

export async function removeDatabase(recordsDb: RefineryDatabaseWrapper){
    await recordsDb.auth;
    await recordsDb.server.destroy(
        recordsDb.config.refinery.database.databaseName
    );
}