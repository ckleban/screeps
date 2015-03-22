var role_miner = {
    
    //TODO
    base: function(creep) {
        
	    //var source = Game.getObjectById(creep.memory.orig_target);
		//creep.moveTo(source);
		//creep.harvest(source);

		
    },
 
 
 
 	mine_normal: function(creep,job,spot,spawn) {
 	    var source = Game.getObjectById(job.jobmemory.source);
        //creep.moveTo(source);
        creep.harvest(source);
        
        
        var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 7, {
			filter: function(object) {
				//return object.hits > 50;
                return object.hitsMax > 3000;
			}
		});
        
        
        if(targets.length > 0) {
            //if (targets[0].hits>99){
            if (targets[0].hits>0){
                creep.moveTo(source.pos.x,source.pos.y-8);
                job.jobmemory.danger="true";
            } else {
                job.jobmemory.danger="false";
                creep.moveTo(source);
            }
        } else {
            //Check if nearby hostile spawn is about to spawn something
            var hostile_spawn = creep.pos.findClosest(Game.HOSTILE_STRUCTURES, {
                filter: function(object) {
                    return object.structureType == "keeperLair";
                }
            });
            
            if (hostile_spawn){
                // If spawn of bad guy is about to happen
                if (hostile_spawn.ticksToSpawn < 20 && hostile_spawn.ticksToSpawn > 0) {
                    creep.moveTo(source.pos.x,source.pos.y-8);
                    job.jobmemory.danger="true";
              
                    // If no enemies in range and no spawn about to happen, go mine!
                } else {
                    job.jobmemory.danger="false";
                    creep.moveTo(source);
                }
            }
            
            
            
           
        }
        
        
        
    }
    
    
    
    
    
     	mine_chain: function(creep,job,spot,spawn) {
 	    var source = Game.getObjectById(job.jobmemory.source);
        //creep.moveTo(source);
        creep.harvest(source);
        
        
        var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 7, {
			filter: function(object) {
				//return object.hits > 50;
                return object.hitsMax > 3000;
			}
		});
        
        
        if(targets.length > 0) {
            //if (targets[0].hits>99){
            if (targets[0].hits>0){
                creep.moveTo(source.pos.x,source.pos.y-8);
                job.jobmemory.danger="true";
            } else {
                job.jobmemory.danger="false";
                creep.moveTo(source);
            }
        } else {
            //Check if nearby hostile spawn is about to spawn something
            var hostile_spawn = creep.pos.findClosest(Game.HOSTILE_STRUCTURES, {
                filter: function(object) {
                    return object.structureType == "keeperLair";
                }
            });
            
            if (hostile_spawn){
                // If spawn of bad guy is about to happen
                if (hostile_spawn.ticksToSpawn < 20 && hostile_spawn.ticksToSpawn > 0) {
                    creep.moveTo(source.pos.x,source.pos.y-8);
                    job.jobmemory.danger="true";
              
                    // If no enemies in range and no spawn about to happen, go mine!
                } else {
                    job.jobmemory.danger="false";
                    creep.moveTo(source);
                }
            }
            
            
            
           
        }
        
        
        
    }
    
    
    
};

module.exports = role_miner;


