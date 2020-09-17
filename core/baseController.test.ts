import { BaseController } from '../../src/controllers/baseController';
import * as assert from 'assert';


var baseCtl: BaseController | undefined = undefined;

describe("Test External Engine", function(){
    before(function(){
        baseCtl = new BaseController();
    })
    it("should load a fake engine", function(){
        assert.notEqual(baseCtl?.allEngineNames.filter((val)=>{return val === 'fake'}).length, 0);
        // FIXME: load works (tested manually) but circular dependency if testing from within
    });
});