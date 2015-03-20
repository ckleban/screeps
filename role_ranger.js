var role_ranger = {
    
    //TODO
    base: function(creep) {
        
        // find target (but exclude spawn gaurds in march2015 survival game)

		
    },
 
 	attack_source: function(creep,job,spot) {
        creep.moveTo(job.jobmemory.x+spot,job.jobmemory.y);
        var target = creep.pos.findClosest(Game.HOSTILE_CREEPS);
        
	    //var source = creep.pos.findNearest(Game.HOSTILE_CREEPS)
	    if(target) {
		   	creep.rangedAttack(target);
    	}
        
    }, 
 
 	wallofranged: function(creep,job,spot) {
        creep.moveTo(job.jobmemory.x+spot,job.jobmemory.y);
        var target = creep.pos.findClosest(Game.HOSTILE_CREEPS, {
            filter: function(object) {
                return object.hitsMax < 4999;
            }
		});
        
	    //var source = creep.pos.findNearest(Game.HOSTILE_CREEPS)
	    if(target) {
		   	creep.rangedAttack(target);
    	}
        
    }
};

module.exports = role_ranger;



