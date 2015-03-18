var role_miner = {
    
    //TODO
    base: function(creep) {
        
	    //var source = Game.getObjectById(creep.memory.orig_target);
		//creep.moveTo(source);
		//creep.harvest(source);

		
    },
 
 
 
 	mine_normal: function(creep,job,spot) {
 	    var source = Game.getObjectById(job.jobmemory.source);
        creep.moveTo(source);
        creep.harvest(source);
        
    }
};

module.exports = role_miner;


