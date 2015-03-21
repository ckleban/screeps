var role_miner = {
    
    //TODO
    base: function(creep) {
        
	    //var source = Game.getObjectById(creep.memory.orig_target);
		//creep.moveTo(source);
		//creep.harvest(source);

		
    },
 
 
 
 	mine_normal: function(creep,job,spot,spawn) {
 	    var source = Game.getObjectById(job.jobmemory.source);
        //creep.moveTo(source);
        creep.harvest(source);
        
        
        var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 9, {
			filter: function(object) {
				return object.hits > 50;
			}
		});
        
        if(targets.length > 0) {
            creep.moveTo(spawn);
        } else {
            creep.moveTo(source);
        }
        
        
        
    }
};

module.exports = role_miner;


