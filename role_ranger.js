var role_ranger = {
    
    //TODO
    base: function(creep) {
        
        // find target (but exclude spawn gaurds in march2015 survival game)

		
    },
 
 	attack_source: function(creep,job,spot) {
        creep.moveTo(job.jobmemory.x+spot,job.jobmemory.y);
        
        // don't actually kill the big bad guy, this will delay another one coming
        var target = creep.pos.findClosest(Game.HOSTILE_CREEPS, {
            filter: function(object) {
                //return object.hits > 99;
                return object.hits > 0;
            }
		});
        
        //var target = creep.pos.findClosest(Game.HOSTILE_CREEPS);
        
	    //var source = creep.pos.findNearest(Game.HOSTILE_CREEPS)
	    if(target) {
		   	creep.rangedAttack(target);
    	}
        
    }, 
 
 	wallofranged: function(creep,job,spot) {
        
        if (creep.ticksToLive<0) {
            creep.moveTo(job.jobmemory.x+spot,job.jobmemory.y+1);    
        } else {
            
            creep.moveTo(job.jobmemory.x+spot,job.jobmemory.y);
        }
        
        var target = creep.pos.findClosest(Game.HOSTILE_CREEPS, {
            filter: function(object) {
                return object.hitsMax < 4999;
            }
		});
        
        var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
        if(targets.length>2) {
            creep.rangedMassAttack();
        } else if (targets.length>0) {
            creep.rangedAttack(target);
        }
        
        
    }
};

module.exports = role_ranger;



