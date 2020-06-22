import * as assert from 'assert';
import { config } from '../../src/configProvider';

let configObj = config();

describe("\`configProvider\` default load", function(){
    it("should have a \`database\` config", function(){
        assert.notEqual(configObj.refinery.database, undefined);
    });
    it("should have a \`notebooks\` config", function(){
        assert.notEqual(configObj.phlower.notebooks, undefined);
    });
    it("should have a \`decks\` config", function(){
        assert.notEqual(configObj.phlower.decks, undefined);
    });
    it("should have \`algorithms\` config", function(){
        assert.notEqual(configObj.phlower.algorithms, undefined);
    });
    it("should have \`formatting\` config", function(){
        assert.notEqual(configObj.phlower.formatting, undefined);
    });
});