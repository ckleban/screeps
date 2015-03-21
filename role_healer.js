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
        var target = creep.pos.findNearest(Game.DROPPED_ENERGY);
		    
        // if ranger is alive and nearer the enemy
        //if (ranger && ranger.pos.y>creep.pos.y && creep.energy < creep.energyCapacity && job.jobmemory.danger=="false") {
            
            
            

            
        var target = creep.pos.findClosest(Game.MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
			}
		});
		
        if (job.jobmemory.health="healthy"){
            if(target !== null) {
                creep.moveTo(target);
            } else {
                creep.moveTo(job.jobmemory.x+spot,job.jobmemory.y-1);
            }
        } else {           
            creep.moveTo(job.jobmemory.x+spot,job.jobmemory.y-1);
        }
            
        if(target !== null) {
            creep.heal(target);
            creep.rangedHeal(target);
		} else {
			//this.idleDefence(creep);
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
        
        
        // Close Heal closet creep
        var closetarget = creep.pos.findClosest(Game.MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
			}
		});
		
        if(target !== null) {
            creep.heal(target);
            //creep.rangedHeal(target);
		} 
        
        
        //Logic to find nearest creep that needs healing
        /*var target = creep.pos.findClosest(Game.MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
			}
		});
		if(target !== null) {
            creep.heal(target);
            creep.rangedHeal(target);
		} else {
			//this.idleDefence(creep);
		}
        */
		
    }
};

module.exports = role_healer;


