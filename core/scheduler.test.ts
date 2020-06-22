import * as assert from 'assert';
import { EasinessFactorParameterSet, SchedulingAlgorithm } from '../../src/scheduler';
import dedent from 'ts-dedent';

let fakeAlgoConfig = {
    new: {
        startingDelays: [1, 10],
        initialFactor: 2.5,
        startingIntervals: [1, 4]
    }
}

let candidateParameters = [
    [1, 2],
    [3, 5],
    [4.1, 8.7],
    [9.2, 1.5]
];

let prevEFs = [1.3, 1.2, 4.5, 3.3, 2.6];
let correctnessLevels = [1, 2, 3, 4]

describe("Test Scheduler", function(){

    describe("\`EasinessFactorParameterSet\` class", function(){
        candidateParameters.forEach(function(paramSet){
            it(dedent`should always maintain a root in q==3 (f(x)==0 for x == 3)
            alpha&beta: ${paramSet}`, function(){
                let efClass = new EasinessFactorParameterSet(paramSet[0], paramSet[1]);
                assert.equal(efClass.getIncrement(3), 0);
            });
            
        });
    });

    describe("\`getNewEasinessFactor\` function", function(){
        prevEFs.forEach(function(ef){
            correctnessLevels.forEach(function(corr){
                candidateParameters.forEach(function(paramSet){
                    it(dedent`should never return an EF below 1.3 
                    (EF: ${ef}, correctness: ${corr}, alpha&beta: ${paramSet})`, function(){
                        let schedAlgo = new SchedulingAlgorithm(fakeAlgoConfig);
                        assert.equal(
                            schedAlgo.getNewEasinessFactor(ef, corr, [paramSet[0], paramSet[1]]) >= 1.3,
                            true
                        );
                    }); 
                });
            });
        });
    });

});
