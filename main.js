// Screeps script by Chris Kleban
//
// This is the main loop file that runs every time interval in the screeps game. 
//



//Game.memory=null;
var _ = require('lodash');




for (var ii in Game.rooms){
    var room = Game.rooms[ii];
    //console.log(room.name);
    //room.memory.homeroom=room.name;
    if (!room.memory.init){
        room.memory.init='true';
        Game.memory=null;
    } 
    
}




//console.log(Game.time);
if (Game.time<1){
//var room = Game.spawns.Spawn1.room;
//if(room.survivalInfo.score === 0) {
  //console.log("STARTING NEW GAME. Resetting memory");
  //Game.memory=null;
} else {

//var source = Game.spawns.Spawn1.pos.findNearest(Game.SOURCES)
	

 //   Game.spawns.Spawn1.createCreep([Game.ATTACK, Game.TOUGH, Game.MOVE],null,{role:"guard"});

//makeCreep();


//var room = Game.spawns.spawn1.room;

//var spawns = Game.spawns;
for (var i in Game.spawns) {
    var spawn = Game.spawns[i];
    //console.log(spawn.name);
    require('spawnManager').action(spawn);
    require('jobManager').action(spawn);
    
    // If spare energy is high, increase wall size by 1
    //if (Game.time % 200 === 0 && Memory.jobList[0].jobmemory.rangers<7){
    if (spawn.energy>1000 && Game.time > 200 && spawn.memory.buildQueue.length < 2) {
        if (Memory.jobList[2].jobmemory.healers<7) {
            require('job_wallofranged').increase(spawn,Memory.jobList[2],1,'healer');
        }
        if (Memory.jobList[2].jobmemory.rangers<7) {
            require('job_wallofranged').increase(spawn,Memory.jobList[2],1,'ranger');
        }
        console.log("over 1000!!!!!!!!!!!!!!!!!");
    }
    
    
    // Attack close source. 
    if (spawn.energy>3000 && Game.time > 200 && spawn.memory.buildQueue.length < 2) {
        console.log("over 3000!!!!!!!!!!!!!!!!!");
        require('jobManager').addToList('attack_sourc1', 'attack_source', {rangers:0,healers:1,x:44,y:26,direction_x:1,healers_y:1});
    }
    
    
    
    
    
    if (Game.time % 403 === 0 && Game.time > 200){
    //if (spawn.energy>1000 && spawn.memory.buildQueue.length < 1 && Memory.jobList[0].rangers<7) {
       // require('spawnManager').addToQueue(spawn,"healer");
        
    }
    if (Game.time % 200 === 0 && Memory.jobList[0].jobmemory.rangers>5) {
        //require('job_wallofranged').decrease(spawn,Memory.jobList[0],1);
        console.log("decreasing!!!!!!!!! 1");
    }
    
    /*
    if (spawn.energy>4000 && spawn.memory.buildQueue.length < 1 && Memory.jobList[0].rangers>4) {
        require('job_wallofranged').decrease(spawn,Memory.jobList[0],1);
        console.log("trying a decreasE!");
    }   
    
    */
    
    if (Game.time % 200 === 0 && Memory.jobList[0].rangers<7){
    //     require('job_wallofranged').increase(spawn,Memory.jobList[0],1);
    }
    
    
    
    /*
    if (Game.time % 200 === 0){
        require('spawnManager').addToQueue(spawn,"defender");
        require('spawnManager').addToQueue(spawn,"healer");
        require('spawnManager').addToQueue(spawn,"defender");
    }
    */
    
}

}

//manage harvesters









for(var name in Game.creeps) {
	var creep = Game.creeps[name];

	if(creep.memory.role == 'miner') {
		require('role_miner').base(creep);
    
	}	
	if(creep.memory.role == 'ranger') {
		require('role_ranger').base(creep);
    
	}
	if(creep.memory.role == 'mover') {
		require('role_mover').base(creep);
    
	}
	if(creep.memory.role == 'healer') {
		require('role_healer').base(creep);
	}
		
}
