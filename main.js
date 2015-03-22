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
    //var objects=Game.rooms[ii].lookAt(47,29);
    
    
    //console.log(objects);
    //console.log(JSON.stringify(objects, null, 4));
    
}




//console.log(Game.time);
//if (Game.time<1){
//var room = Game.spawns.Spawn1.room;
//if(room.survivalInfo.score === 0) {
  //console.log("STARTING NEW GAME. Resetting memory");
  //Game.memory=null;
//} else {

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
    
    
    
    // Job logic
    
    
    
    
    /*
    if (spawn.memory.jobList.length==0){
        var source = spawn.pos.findNearest(Game.SOURCES);    
        require('jobManager').addToList(spawn,'mine_normal1', 'mine_normal', {miners:1,movers:1,source:source.id});
    } 
    */
    
    if (spawn.memory.jobList.length==0){
        var source = spawn.pos.findNearest(Game.SOURCES);    
        require('jobManager').addToList(spawn,'mine_chain1', 'mine_chain', {miners:1,movers=0,source:source.id});
    } 
    
    
    
    
    if (spawn.memory.jobList.length==1 && spawn.memory.jobList[0].jobmemory.health=='healthy' && spawn.energy>402 && spawn.memory.buildQueue.length < 2){
        var source = spawn.pos.findNearest(Game.SOURCES);
        require('jobManager').addToList(spawn,'mine_normal2', 'mine_normal', {miners:1,movers:1,source:source.id});   
    } 
    if (spawn.memory.jobList.length==2 && spawn.memory.jobList[1].jobmemory.health=='healthy' && spawn.energy>802 && spawn.memory.buildQueue.length < 2){
        require('jobManager').addToList(spawn,'wallofranged1', 'wallofranged', {rangers:1,healers:1,x:35,y:13,direction_x:1,healers_y:1});
    }     
    if (spawn.memory.jobList.length==3 && spawn.memory.jobList[2].jobmemory.health=='healthy' && spawn.energy>702 && spawn.memory.buildQueue.length < 2){
        require('jobManager').addToList(spawn,'attack_source1', 'attack_source', {rangers:0,healers:2,x:44,y:22,direction_x:1,healers_y:1});
    }     
    if (spawn.memory.jobList.length==4 && spawn.memory.jobList[3].jobmemory.health=='healthy' && spawn.energy>1102 && spawn.memory.buildQueue.length < 2){
        var creepie = Game.getObjectById(spawn.memory.jobList[3].jobmemory.ranger[0]);
        var source = creepie.pos.findNearest(Game.SOURCES);
        require('jobManager').addToList(spawn,'mine_normal3', 'mine_normal', {miners:1,movers:2,source:source.id});   
    }     
    /*if (spawn.memory.jobList.length==5 && spawn.memory.jobList[4].jobmemory.health=='healthy' && spawn.energy>1102 && spawn.memory.buildQueue.length < 2){
         require('jobManager').addToList(spawn,'wallofranged2', 'wallofranged', {rangers:2,healers:2,x:37,y:11,direction_x:1,healers_y:1});
   } */    

    
    
    
    
    if (spawn.energy>800 && spawn.memory.buildQueue.length < 2 && spawn.memory.jobList.length>3) {
        console.log("over 800!!!!!!!!!!!!!!!!!");
        if (spawn.memory.jobList[3].jobmemory.healers<2) {
            require('job_attack_source').increase(spawn,spawn.memory.jobList[3],1,'healer');
        } 
        if (spawn.memory.jobList[3].jobmemory.rangers<1) {
            require('job_attack_source').increase(spawn,spawn.memory.jobList[3],1,'ranger');
        }
    }   
 
    if (spawn.energy>1100 && spawn.memory.buildQueue.length < 2 && spawn.memory.jobList.length>4) {
        console.log("over 900!!!!!!!!!!!!!!!!!");
        if (spawn.memory.jobList[4].jobmemory.movers<5) {
            console.log("more movers!");
            require('job_mine_normal').increase(spawn,spawn.memory.jobList[4],1,'mover');
        } 
    }   
    
    // move source attack in/out of position based on various factors
    
    if (spawn.memory.jobList.length>3){
        if (spawn.memory.jobList[3].jobmemory.health=='healthy'){
            //console.log("attack!");
            spawn.memory.jobList[3].jobmemory.y=26;
            
        } else {
            //console.log("retreat!");
            spawn.memory.jobList[3].jobmemory.y=24;       
        }
    }
    
    
    // If spare energy is high, increase wall size by 1
    //if (Game.time % 200 === 0 && Memory.jobList[0].jobmemory.rangers<7){
    if (spawn.energy>1202 && spawn.memory.buildQueue.length < 2 && spawn.memory.jobList.length>2) {
        console.log("over 1000!!!!!!!!!!!!!!!!!");
        if (spawn.memory.jobList[2].jobmemory.healers<7) {
            require('job_wallofranged').increase(spawn,spawn.memory.jobList[2],1,'healer');
        } 
        if (spawn.memory.jobList[2].jobmemory.rangers<7) {
            require('job_wallofranged').increase(spawn,spawn.memory.jobList[2],1,'ranger');
        }
    }

    
    
    
    // Attack close source. 
    if (spawn.energy>3000 && Game.time > 200 && spawn.memory.buildQueue.length < 2) {
        console.log("over 3000!!!!!!!!!!!!!!!!!");
        //require('jobManager').addToList(spawn, 'attack_source1', 'attack_source', {rangers:0,healers:1,x:44,y:26,direction_x:1,healers_y:1});
    }
    
    
    
    
    
    //if (Game.time % 403 === 0 && Game.time > 200){
    //if (spawn.energy>1000 && spawn.memory.buildQueue.length < 1 && Memory.jobList[0].rangers<7) {
       // require('spawnManager').addToQueue(spawn,"healer");
        
    //}
    //if (Game.time % 200 === 0 && Memory.jobList[0].jobmemory.rangers>5) {
        //require('job_wallofranged').decrease(spawn,Memory.jobList[0],1);
      //  console.log("decreasing!!!!!!!!! 1");
    //}
    
    /*
    if (spawn.energy>4000 && spawn.memory.buildQueue.length < 1 && Memory.jobList[0].rangers>4) {
        require('job_wallofranged').decrease(spawn,Memory.jobList[0],1);
        console.log("trying a decreasE!");
    }   
    
    */
    
    //if (Game.time % 200 === 0 && Memory.jobList[0].rangers<7){
    //     require('job_wallofranged').increase(spawn,Memory.jobList[0],1);
    //}
    
    
    
    /*
    if (Game.time % 200 === 0){
        require('spawnManager').addToQueue(spawn,"defender");
        require('spawnManager').addToQueue(spawn,"healer");
        require('spawnManager').addToQueue(spawn,"defender");
    }
    */
    
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
