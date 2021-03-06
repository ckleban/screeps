var role_healer = {
    
    //TODO
    base: function(creep) {
        
        if (creep.memory.job_active!='true'){ 
            var target = creep.pos.findClosest(Game.MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax;
                }
            });

            if(target !== null) {
                creep.moveTo(target);   
                if(creep.pos.isNearTo(target)) {        
                    creep.heal(target);
                }	else {
                    creep.rangedHeal(target);
                }
            } else {
                //this.idleDefence(creep);
            }
        }
		
    },
 
    attack_source: function(creep,job,spot) {
        
        
        var source = Game.getObjectById(job.jobmemory.source);
        var ranger = Game.getObjectById(job.jobmemory.ranger[0]);
            
        var target = creep.pos.findClosest(Game.MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
			}
		});
		
        creep.moveTo(job.jobmemory.x+spot,job.jobmemory.y-1);
        // Logic to try to move between rangers and source
        // needs better logic
        /*
        if (job.jobmemory.health="healthy"){
            if(target) {
                creep.moveTo(job.jobmemory.x+spot,job.jobmemory.y+1);
            } else {
                creep.moveTo(job.jobmemory.x+spot,job.jobmemory.y-1);
            }
        } else {           
            creep.moveTo(job.jobmemory.x+spot,job.jobmemory.y-1);
        }
        */
        
        // Check if keeper Lair is about to spawn a bad guy!
        

        
        
        ////////////HEALING
        
        // Ranged heal weakest Crrep
        
        
        //Logic to find creep in range that has lowest health
        var targets = creep.pos.findInRange(Game.MY_CREEPS, 3, {
			filter: function(object) {
				return object.hits < object.hitsMax;
			}
		});
        if(targets.length > 0) {
            var best_target = targets[0];
            for (var l in targets) {
                var target = targets[l];
                if ((best_target.hitsMax+best_target.hits)>(target.hitsMax+target.hits)) {
                   best_target = target;
                }
            }
            creep.rangedHeal(best_target);
        }   
        
        
        // Close Heal closet creep
        var closetarget = creep.pos.findClosest(Game.MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
			}
		});
        if(target !== null) {
            creep.heal(target);
		} 
        
        
        
        
		
		
    },
 
    wallofranged: function(creep,job,spot) {
        creep.moveTo(job.jobmemory.x+spot,job.jobmemory.y-1);
        
        
        
        // Ranged heal weakest Crrep
        
        
        //Logic to find creep in range that has lowest health
        var targets = creep.pos.findInRange(Game.MY_CREEPS, 3, {
			filter: function(object) {
				return object.hits < object.hitsMax;
			}
		});
        if(targets.length > 0) {
            var best_target = targets[0];
            for (var l in targets) {
                var target = targets[l];
                if ((best_target.hitsMax+best_target.hits)>(target.hitsMax+target.hits)) {
                   best_target = target;
                }
            }
            creep.rangedHeal(best_target);
        }   
        
        //Logic to find creep in range that has lowest health
        var targets = creep.pos.findInRange(Game.MY_CREEPS, 1, {
			filter: function(object) {
				return object.hits < object.hitsMax;
			}
		});
        if(targets.length > 0) {
            var best_target = targets[0];
            for (var l in targets) {
                var target = targets[l];
                if ((best_target.hitsMax+best_target.hits)>(target.hitsMax+target.hits)) {
                   best_target = target;
                }
            }
            creep.heal(best_target);
        } 
        
        
        
    }
};

module.exports = role_healer;


