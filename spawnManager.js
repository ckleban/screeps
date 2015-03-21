/**
 * creepFactory
 */
 var spawnManager = {

	addToQueue: function(spawn, role, creepMemory) {
		
		if(creepMemory===undefined) {
			creepMemory = {};
		}
		
		spawn.memory.buildQueue.push({
			role: role,
			creepMemory: creepMemory
		});
	},
	
	getFromQueue: function(spawn) {
		
		if(spawn.memory.buildQueue.length > 0) {
			var obj = _.take(spawn.memory.buildQueue);
			spawn.memory.buildQueue = _.drop(spawn.memory.buildQueue);
			
			return obj;
		}
		return null;
		
	},
	
	action: function (spawn) {
		
		if(!spawn.memory.buildQueue) {
			spawn.memory.buildQueue = new Array();
			
			

			this.addToQueue(spawn, 'mover');
			
		}
		console.log (spawn.name+ " - QueueSize: "+spawn.memory.buildQueue.length +" - Energy: "+spawn.energy);
		    
		if(spawn.spawning === null && spawn.memory.buildQueue.length > 0) {
		    
		    var baby = _.take(spawn.memory.buildQueue);
		    console.log (spawn.name+ " - Trying to build: "+baby.role);
		
		    if (baby.role=='miner'){
                var source = spawn.pos.findNearest(Game.SOURCES);
                var result = spawn.createCreep([Game.WORK, Game.WORK, Game.WORK, Game.WORK,Game.MOVE], null, {role:"miner",orig_target:source.id});
   
		        //console.log('Start spawning ' + baby.role+": "+result);
		    	//spawn.memory.buildQueue = _.drop(spawn.memory.buildQueue);
			    
		    }
		   	if (baby.role=='mover'){
                
                var target = "";
                var result = spawn.createCreep([Game.CARRY, Game.MOVE, Game.MOVE], null, {role:"mover",orig_target:target});
                
		        //console.log('Start spawning ' + baby.role+": "+result);
		    	//spawn.memory.buildQueue = _.drop(spawn.memory.buildQueue);
			    
		    }
		   	if (baby.role=='defender'){
                
                var result = spawn.createCreep([Game.TOUGH, Game.TOUGH, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE], null, {role:"defender"});
		        //console.log('Start spawning ' + baby.role+": "+result);
		    	//spawn.memory.buildQueue = _.drop(spawn.memory.buildQueue);
			    
			    
		    }
		    
		   	if (baby.role=='healer'){
                
                var result = spawn.createCreep([Game.HEAL, Game.HEAL, Game.HEAL, Game.HEAL, Game.MOVE], null, {role:"healer"});
		
		    }		    
		    
		   	if (baby.role=='ranger'){
                baby.creepMemory.role='ranger';
                var result = spawn.createCreep([Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE], null, baby.creepMemory);
		    }		    
		    		    
        
        
		    if(!_.isString(result)) {
                //console.log('Baby died: ' + baby.role+": "+result);
            } else {
            	console.log('Baby coming: ' + baby.role+": "+result);
				spawn.memory.buildQueue = _.drop(spawn.memory.buildQueue);
			    
            }
		    /*
			var creep = _.take(spawn.memory.buildQueue);
			
			var result = require('creepManager').getRoleObject(creep.role).create(spawn, creep.creepMemory);
			if(result===true) {
				console.log('Start spawning ' + creep.role+": "+result);
				spawn.memory.buildQueue = _.drop(spawn.memory.buildQueue);
			}
            */
		}
	}
};

module.exports = spawnManager;
