var role_arena = {
    
    //TODO
    base: function(creep) {
    
    
        if (creep.memory.job_active!='true'){ 
            //console.log(creep);
            
            
            
            
            
            
            var currentroom=creep.room.name;
            var previousroom=creep.memory.room.name;
            //console.log(creep.room.name + " - " + creep.memory.room.name);
            if (currentroom!=previousroom){
                //console.log("SAME ROOM");
                
                // line to erase all map memory
                
                //Memory.map[previousroom].exit = {}; 
            
                
                console.log("NEW ROOM");
                
                // if new room, update map object showing which rooms are connected to what other rooms  
                if (!Memory.map[previousroom].exit){
                    Memory.map[previousroom].exit = {};  
                    console.log("SETTING MAP VAR");
                }
                if (creep.memory.leaving){
                    Memory.map[previousroom].exit[creep.memory.leaving]=currentroom;
                    console.log("SETTING PREVIOUS ROOM EXIT" + previousroom + creep.memory.leaving + currentroom);
                }
            } else {
                //console.log("OLDDDDDDD ROOM");
                //Memory.map[previousroom].exit = {};   
                
            }
            
            
            creep.memory.leaving=0;
            
            
            
            
            // find places to avoid (IE, bad guys)
            
            var avoids = creep.pos.findInRange(Game.HOSTILE_CREEPS, 30, {
                filter: function(object) {
                    return object.hits > 99 && object.id!=creep.id;
                }    
            });
            
            var avoid_positions = new Array();
                
            if(avoids.length > 0) {
                for (var l in avoids) {
                    var avoider = avoids[l];
                    avoid_positions.push(avoider.pos);
                    
                    //
                    
                    // 
                    for (xx = -3; xx < 3; xx++) { 
                        for (yy = -3; yy < 3; yy++) { 
                            console.log(xx);
                            console.log(yy);
                            var new_position = creep.room.getPositionAt(avoider.pos.x+xx,avoider.pos.y+yy);
                            console.log(JSON.stringify(new_position, null, 4));
                            if (new_position!=null) {
                                
                                avoid_positions.push(new_position);     
                            } else {
                                console.log("NULL POS FOUND");   
                            }
                        }
                    }
                   
                }
                console.log(avoid_positions.length);
                //console.log(JSON.stringify(avoid_positions, null, 4));
                
            } else {
            
            
            }
                        
            
            
            
            
        
   	        //console.log(creep.memory.leaving.name + " - " + creep.memory.room.name);
           
            
            // if I have no energy
            if(creep.energy < 1) {
                
                // if dropped energy in room, pick it up
                var target = creep.pos.findNearest(Game.DROPPED_ENERGY);
                if (target) {    
                    creep.moveTo(target);
                    creep.pickup(target);
                
                // else, if bad guy with energy, move to bad guy
                } else {
                    var target = creep.pos.findClosest(Game.HOSTILE_CREEPS, {
                        filter: function(object) {
                            return object.hitsMax < 999 && object.energy>0;
                        }
                    });
                    if (target){ 
                        creep.moveTo(target);               
                    }  else {
                    // else, leave room
                        
                        //var exitlocations = new Array();
                        var exitlocations = new Object();
                        
                        var exits=[Game.EXIT_TOP,Game.EXIT_RIGHT,Game.EXIT_BOTTOM,Game.EXIT_LEFT];
                        var closest = 500;
                        var bestpos= {};
                        var bestexit=0;
                        var timediff=0;
                        var hasenergy="";
                        
                        
                        
                        
                        exits.forEach(function(entry) {
                            //console.log("Exit: "+entry);
                            exitlocations[entry] = new Array();
                        
                            timediff=1000000;
                        
                            var exit = creep.pos.findClosest(entry);
                            
                            if (exit) {    
                                                           
                                //var path = creep.pos.findPathTo(exit.pos, {ignore:avoid_positions);
                                
                                
                                var path = creep.pos.findPathTo(exit.pos);
                                if( path.length ) {
                                    //console.log(entry + " - " + path.length);
                                    exitlocations[entry].push(exit.pos);   
                                    exitlocations[entry][0].length=path.length;  
                                    
                                    
                                    // if been there before
                                    if (Memory.map[currentroom].exit){
                                        exitroom=Memory.map[currentroom].exit[entry];
                                        if (exitroom) {
                                            room=Memory.map[exitroom];
                                            //Memory.map[previousroom].exit
                                            if (room){
                                                
                                                //console.log(Game.time-room.lastseentime);
                                                timediff=Game.time-room.lastseentime;
                                                hasenergy=room.energy;
                                                
                                                
                                                //console.log(creep.room.name + " exit:"+entry+"goes to room:"+exitroom+" timediff: "+timediff + " energy: "+hasenergy);
                                                //console.log("TRUE3");
                                            
                                            } else {
                                                //console.log("FALSE3");
                                            }
                                        
                                        }
                                    }
                                    
                
                    //      Game.rooms[creep.memory.room.name].memory.exit[creep.memory.leaving]=creep.room.name;
                
                                    //var creep = Game.getObjectById(job.jobmemory[role][spot]);
        
                                    
                                    
                                    if (hasenergy=="true"){
                                        bestpos=exit.pos;
                                        bestexit=entry;
                                    }
                                    if (path.length<closest && timediff>500){
                                        bestpos=exit.pos;
                                        bestexit=entry;
                                    } else if (path.length<closest && timediff==1000000){
                                        bestpos=exit.pos;
                                        bestexit=entry;                                          
                                    } else {
                                        //bestpos=exit.pos;
                                        //bestexit=entry;                                         
                                    }
                                }      
                                

                            }
                        });
                        
                        
                        
                        //console.log(exitlocations);
                        //console.log(room+" has exit on top: "+exits.length);
                        /*
                        console.log(JSON.stringify(exitlocations, null, 4));
                        console.log("-------");
                        console.log(JSON.stringify(bestpos, null, 4));
                        console.log("-------");
                        */
                        
                        //console.log("Going to Exit:" + bestexit);
                 
                        
                        /// put logic here to find bet exit
                        // for now, ust pick one
                        //var leave = exitlocations[0];
                        
                        
                        
                        
                        
                        //simple move without avoiding bad guys:
                        //creep.moveTo(bestpos);
                        
                        //avoid bad guys:
                        if (avoid_positions){
                            var path = creep.pos.findPathTo(bestpos, {avoid:avoid_positions});
                            if( path.length ) {
                                creep.move(path[0].direction);
                            }        
                            
                        }
                        
                        
                        
                        if (bestexit===0){
                            creep.memory.leaving=null;
                        } else {
                            creep.memory.leaving=bestexit;
                        }
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
                return object.hitsMax < 999 && object.energy>0;
            }
		});

        if (creep.energy > 1) {
                //Game.STRUCTURE_PORTAL
                var portal = creep.pos.findNearest(Game.STRUCTURES);
                if (portal){
                    creep.moveTo(portal);
                    creep.transferEnergy(portal);
                } 

            
        } else if (target){
                creep.moveTo(target);
                        
            
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
            
            // if nothing better to do, move to friend in room or in another room
            if (guy){       
                creep.moveTo(guy);  
            } else{
                
                var route2 = Game.map.findRoute(creep.room, Game.creeps.GladRanger.room);
                //console.log('Now heading to room '+route[0].room);
                if (route2[0]){
                    var exit2 = creep.pos.findClosest(route2[0].exit);
                    creep.moveTo(exit2);
                }
                
                
                
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
        
        var energies = creep.pos.findInRange(Game.DROPPED_ENERGY, 50);
        
        
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
            
            if (guy2){       
                creep.moveTo(guy2); 
            } else{
                
                var route2 = Game.map.findRoute(creep.room, Game.creeps.GladTough.room);
                //console.log('Now heading to room '+route[0].room);
                if (route2[0]){
                    var exit2 = creep.pos.findClosest(route2[0].exit);
                    creep.moveTo(exit2);
                }
                
                
                
            }       
            
            
            
            
            
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