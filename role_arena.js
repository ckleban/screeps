var role_arena = {
    
    //TODO
    base: function(creep) {
    
    
        if (creep.memory.job_active!='true'){ 
   	
            if(creep.energy < 1) {
                var target = creep.pos.findNearest(Game.DROPPED_ENERGY);
                if (target) {
                    
                    creep.moveTo(target);
                    creep.pickup(target);
                }
		
            } else if (creep.energy > 1) {
                //Game.STRUCTURE_PORTAL
                var portal = creep.pos.findNearest(Game.STRUCTURES);
                if (portal){
                    creep.moveTo(portal);
                    creep.transferEnergy(portal);
                }
            } else {
                
                var friend = creep.pos.findNearest(Game.MY_CREEP);  
                if (friend){
                    creep.moveTo(friend);
                    
                }
            }
        }
	
		
    },
 
 
 
 	healer: function(creep,job,spot,spawn) {
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
            creep.moveTo(best_target);
        } else {
            var guy = creep.pos.findNearest(Game.MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax;
                }
                                           
            });
            creep.moveTo(guy);   
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

module.exports = role_arena;