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
 
 
 
 	wallofranged: function(creep,job,spot) {
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
		
		
        
    }
};

module.exports = role_healer;


