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
 
    attack_source: function(creep) {
        
        creep.moveTo(job.jobmemory.x+spot,job.jobmemory.y-1);
        var target = creep.pos.findClosest(Game.MY_CREEPS, {
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
		
		
    },
 
    wallofranged: function(creep,job,spot) {
        creep.moveTo(job.jobmemory.x+spot,job.jobmemory.y-1);
        
        
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


