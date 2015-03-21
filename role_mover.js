var role_mover = {
    
    //TODO
    base: function(creep) {
    
    
        if (creep.memory.job_active!='true'){ 
   	
            if(creep.energy < 1) {
                var target = creep.pos.findNearest(Game.DROPPED_ENERGY);
                creep.moveTo(target);
                creep.pickup(target);
		
            }
            else {
                creep.moveTo(Game.spawns.Spawn1);
                creep.transferEnergy(Game.spawns.Spawn1);
            }
        }
	
		
    },
 
 
 
 	mine_normal: function(creep,job,spot,spawn) {
        //creep.moveTo(job.jobmemory.x+spot,job.jobmemory.y);
        
        var source = Game.getObjectById(job.jobmemory.source);
        var miner = Game.getObjectById(job.jobmemory.miner[0]);
        var target = creep.pos.findNearest(Game.DROPPED_ENERGY);
		    
        // if miner isn't in danger
        if (creep.energy < creep.energyCapacity && job.jobmemory.danger=="false") {
            
            // check if miner is near the source
            var targets = miner.pos.findInRange(Game.SOURCES, 1);
            // if yes
            if(targets.length > 0) {
                //if source has energy, move to miner
                if (targets[0].energy>1){
                    creep.moveTo(miner);
                //if source has no energy, move to nearest energy on ground
                } else {
                    creep.moveTo(target);   
                }
            } else {
                creep.moveTo(source.pos.x+5,source.pos.y-8);
               
            }
            

		    creep.pickup(target);
		
        // if miner is in danger, move to safe area
        } else if (creep.energy < creep.energyCapacity && job.jobmemory.danger=="true") {
            creep.moveTo(source.pos.x+5,source.pos.y-8);
            
        // if mover is full, bring back energy
   	    } else {
            //creep.moveTo(Game.spawns.Spawn1);
            //creep.transferEnergy(Game.spawns.Spawn1);
            creep.moveTo(spawn);
            creep.transferEnergy(spawn);
	    }
    }
};

module.exports = role_mover;
