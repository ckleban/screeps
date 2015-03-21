var role_mover = {
    
    //TODO
    base: function(creep) {
    
    
  if (creep.memory.job_active!='true'){ 
   	
    if(creep.energy < 1) {
	    //creep.memory.target="0";
        /*
		var sources = creep.room.find(Game.SOURCES);
		var source = creep.pos.findNearest(Game.SOURCES);
	    var target = creep.memory.target;
	    if (target!=null){
	        creep.moveTo(target);
	        creep.memory.target=source;
	    } else {
	        //creep.moveTo(source);
	    }
	    */
	    //var source = Game.getObjectById(creep.memory.orig_target);
	    //var target = creep.memory.orig_target;
	    //var target = Game.getObjectByName(creep.memory.orig_target);
	    var target = creep.pos.findNearest(Game.DROPPED_ENERGY);
		//console.log(target);
		//creep.moveTo(sources[0]);
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
        
        
        if(creep.energy < creep.energyCapacity && job.jobmemory.danger="false") {
            var miner = Game.getObjectById(job.jobmemory.miner[0]);
	        var target = creep.pos.findNearest(Game.DROPPED_ENERGY);
		    creep.moveTo(miner);
		    creep.pickup(target);
		
    
    	
   	    } else {
            //creep.moveTo(Game.spawns.Spawn1);
            //creep.transferEnergy(Game.spawns.Spawn1);
            creep.moveTo(spawn);
            creep.transferEnergy(spawn);
	    }
    }
};

module.exports = role_mover;
