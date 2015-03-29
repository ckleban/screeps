var role_arena = {
    
    //TODO
    base: function(creep) {
    
    
        if (creep.memory.job_active!='true'){ 
   	        console.log(creep.memory.leaving.name + " - " + creep.memory.room.name);
            // if I have no energy
            if(creep.energy < 1) {
                
                // if dropped energy in room, pick it up
                var target = creep.pos.findNearest(Game.DROPPED_ENERGY);
                if (target) {    
                    creep.moveTo(target);
                    creep.pickup(target);
                
                // else, if bad guy, move to bad guy
                } else {
                    var target = creep.pos.findClosest(Game.HOSTILE_CREEPS, {
                        filter: function(object) {
                            return object.hitsMax < 4999 && object.id!=creep.id;
                        }
                    });
                    if (target){ 
                        creep.moveTo(target);               
                    }  else {
                    // else, leave room
                        
                        //var exitlocations = new Array();
                        var exitlocations = new Object();
                        
                        var exits=[Game.EXIT_TOP,Game.EXIT_BOTTOM,Game.EXIT_RIGHT,Game.EXIT_LEFT];
                        exits.forEach(function(entry) {
                            exitlocations[entry] = new Array();
                            var exit = creep.pos.findClosest(entry);
                            if (exit) {    
                                exitlocations[entry].push(exit.pos);   
                                
                                var path = creep.pos.findPathTo(exit.pos);
                                if( path.length ) {
                                    consolg.log(path.length);
                                    //creep.move(path[0].direction);
                                }                       

                            }
                        });
                        //console.log(exitlocations);
                        //console.log(room+" has exit on top: "+exits.length);
                        console.log(JSON.stringify(exitlocations, null, 4));
                        
                        var path = creep.pos.findPathTo(target, {maxOps: 200});
                        if( !path.length || !target.equalsTo(path[path.length - 1]) ) {
                            path = creep.pos.findPathTo(target, {maxOps: 1000, ignoreDestructibleStructures: true});
                        }
                        if( path.length ) {
                            creep.move(path[0].direction);
                        }                   
                        
                        /// put logic here to find bet exit
                        // for now, ust pick one
                        //var leave = exitlocations[0];
                        //creep.moveTo(leave);
                        //creep.memory.leaving=leave;
                        
                    }

                        
                        
                        
                        
                        
                        
                }
            
		
                
            // if I have energy
                
            } else if (creep.energy > 1) {
                //Game.STRUCTURE_PORTAL
                var portal = creep.pos.findNearest(Game.STRUCTURES);
                if (portal){
                    creep.moveTo(portal);
                    creep.transferEnergy(portal);
                }
            } else {
               
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
	
	   creep.memory.room=creep.room;
            	
    },
 
    tough: function(creep) {


        var energy = creep.pos.findNearest(Game.DROPPED_ENERGY);
            
        var target = creep.pos.findClosest(Game.HOSTILE_CREEPS, {
            filter: function(object) {
                return object.hitsMax < 4999;
            }
		});
        if (target){
            creep.moveTo(target);
            
        } else if (creep.energy > 1) {
                //Game.STRUCTURE_PORTAL
                var portal = creep.pos.findNearest(Game.STRUCTURES);
                if (portal){
                    creep.moveTo(portal);
                    creep.transferEnergy(portal);
                } 
            
        } else if (energy) {
                    
                creep.moveTo(energy);
                creep.pickup(energy);
            
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
            creep.rangedAttack(targets[0]);
        }
        var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 1);
        if(targets) {
            creep.attack(targets[0]);
        }	
		
    },
 
 	healer: function(creep) {
        
        if (creep.hits<200){
            creep.suicide();
            
        }
                //Logic to find creep in range that has lowest health
        
        var energies = creep.pos.findInRange(Game.DROPPED_ENERGY, 5);
        
        
        //console.log("Healer");
        var guy = creep.pos.findNearest(Game.MY_CREEPS, {
            filter: function(object) {
                //return object.name=="GladTough";
                return object.hits < object.hitsMax && object.id!=creep.id;
            }                                      
        });
        
            
         if (creep.energy > 1) {
            //Game.STRUCTURE_PORTAL
            var portal = creep.pos.findNearest(Game.STRUCTURES);
            if (portal){
                creep.moveTo(portal);
                creep.transferEnergy(portal);
            }          
         } else if (guy){       
            creep.moveTo(guy);   
            
            
            
        } else if (energies.length>0){
            creep.moveTo(energies[0]);  
            creep.pickup(energies[0]);  
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