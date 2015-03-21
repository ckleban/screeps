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
        
        
        if (creep.energy < creep.energyCapacity && job.jobmemory.danger=="false") {
            var source = Game.getObjectById(job.jobmemory.source);
            var miner = Game.getObjectById(job.jobmemory.miner[0]);
	        var target = creep.pos.findNearest(Game.DROPPED_ENERGY);
		    creep.moveTo(source);
		    creep.pickup(target);
		
    
        } else if (creep.energy < creep.energyCapacity && job.jobmemory.danger=="true") {
            var source = Game.getObjectById(job.jobmemory.source);
            creep.moveTo(source.pos.x+5,source.pos.y-8);
            
		    
   	    } else {
            //creep.moveTo(Game.spawns.Spawn1);
            //creep.transferEnergy(Game.spawns.Spawn1);
            creep.moveTo(spawn);
            creep.transferEnergy(spawn);
	    }
    }
};

module.exports = role_mover;
