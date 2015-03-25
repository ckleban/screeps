var role_arena = {
    
    //TODO
    base: function(creep) {
    
    
        if (creep.memory.job_active!='true'){ 
   	
            if(creep.energy < 1) {
                var target = creep.pos.findNearest(Game.DROPPED_ENERGY);
                if (target) {
                    
                    creep.moveTo(target);
                    creep.pickup(target);
                } else {
                    var friend = creep.pos.findNearest(Game.MY_CREEPS);  
                    if (friend){
                        creep.moveTo(friend);
                    
                    }   
                    
                }
		
            } else if (creep.energy > 1) {
                //Game.STRUCTURE_PORTAL
                var portal = creep.pos.findNearest(Game.STRUCTURES);
                if (portal){
                    creep.moveTo(portal);
                    creep.transferEnergy(portal);
                }
            } else {
                var target = creep.pos.findClosest(Game.HOSTILE_CREEPS, {
                    filter: function(object) {
                        return object.hitsMax < 4999 && object.id!=creep.id;
                    }
                });
                creep.moveTo(target);               

            }
            
            
            
            
            var attacktargets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
            if(attacktargets.length>2) {
                creep.rangedMassAttack();
            } else if (attacktargets.length>0) {
                creep.rangedAttack(attacktargets[0]);
            }
            var closetargets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 1);
            if(closetargets) {
                creep.attack(closetargets[0]);
            }	
            
            
        }
	
		
    },
 
    tough: function(creep) {
    

        
        var target = creep.pos.findClosest(Game.HOSTILE_CREEPS, {
            filter: function(object) {
                return object.hitsMax < 4999;
            }
		});
        if (target){
            
            creep.moveTo(target);
        } else {
            
            var guy = creep.pos.findNearest(Game.MY_CREEPS, {
                filter: function(object) {
                    //return object.name=="GladTough";
                    return object.name!="GladHealer" && object.id!=creep.id;
                }                                      
            });
            if (guy){       
                creep.moveTo(guy);  
            }
        }
        
        
        var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
        if(targets.length>2) {
            creep.rangedMassAttack();
        } else if (targets.length>0) {
            creep.rangedAttack(target);
        }
        var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 1);
        if(targets) {
            creep.attack(targets[0]);
        }	
		
    },
 
 	healer: function(creep) {
                //Logic to find creep in range that has lowest health
        
        
        //console.log("Healer");
        var guy = creep.pos.findNearest(Game.MY_CREEPS, {
            filter: function(object) {
                //return object.name=="GladTough";
                return object.hits < object.hitsMax && object.id!=creep.id;
            }                                      
        });
        if (guy){       
            creep.moveTo(guy);  
        } else {
            var guy2 = creep.pos.findNearest(Game.MY_CREEPS, {
                filter: function(object) {
                    //return object.name=="GladTough";
                    return object.id!=creep.id;
                }                                      
            });
            creep.moveTo(guy2);
        }
        
        
        
        var targets = creep.pos.findInRange(Game.MY_CREEPS, 3, {
			filter: function(object) {
				return object.hits < object.hitsMax && object.id!=creep.id;
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
            //creep.moveTo(best_target);
        } else {
            
            
        }
        
        
        //Logic to find creep in range that has lowest health
        var targets = creep.pos.findInRange(Game.MY_CREEPS, 1, {
			filter: function(object) {
				return object.hits < object.hitsMax && object.id!=creep.id;
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