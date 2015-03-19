/**
 * Job Manager.js
 */


var jobManager = {
    
    addToList: function(spawn, name, role, jobmemory) {
   
        
        if(jobmemory===undefined) {
            jobmemory = {};
        }
        spawn.memory.jobList.push({
            name: name,
            role: role,
            health: 'new',
            jobmemory: jobmemory
        });
    },
    
    //Function to create memory structure for Roles/Creeps for new job
    handleCreepActions: function(spawn,job,role,spot) {
        var creep = Game.getObjectById(job.jobmemory[role][spot]);
        
        //check if creep is still alive. if not, clean up dead creep
        if(!creep) {
            //console.log('DEATH ON WALL! CreepID:' + job.jobmemory.ranger[x]);
            job.jobmemory[role][spot]=null;
            job.jobmemory[role].splice(spot,1);
            job.jobmemory.health = 'death';
            return(0);
        } else { // if alive, move to spot
            //console.log('Creep ALIVE ID:' + job.jobmemory.ranger[x]);
            require('role_'+role)[job.role](creep,job,spot,spawn);
            // numCreeps++;
            return(1);
        }
        
    },
    
    
    //Function to create memory structure for Roles/Creeps for new job
    initJobCreepAllocator: function(spawn,job,role,spot) {
       //console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@RUNTION');
        if(!job.jobmemory[role][spot]){ //If we need more rangers
            if(1==2){ // Find avaiable creep
                // fill me in
            } else {  // If non avail, build needed creep
                var creep = require('spawnManager').addToQueue(spawn,role, {job:job.name});
                job.jobmemory[role][spot] = 'spawning';
                job.jobmemory.health = 'spawning';
            } //end if
        } //end if
        
    },

    
    
    //Function to check if creep is finished spawning
    initJobCreepSpawnChecker: function(spawn,job,role,spot) {
        for (var qq in Game.creeps){
            var creep = Game.creeps[qq];
            if (creep.memory.role==role){
                if (creep.memory.job_active!='true'){
                    job.jobmemory[role][spot]=creep.id;
                    creep.memory.job_active='true';
                    creep.memory.job_pos=spot;
                    break;
                } else {
                    // If no creep available, set status
                    job.jobmemory.health = 'spawning';
                    
                }
            }
        }
    },
    
    
    //// NOT DONE YET
    getFromList: function(spawn) {
        if(spawn.memory.buildQueue.length > 0) {
        var obj = _.take(spawn.memory.buildQueue);
        spawn.memory.buildQueue = _.drop(spawn.memory.buildQueue);
        return obj;
        }
        return null;
    },
    
    
    
    action: function (spawn) {
		
		//console.log("job loop");
        if(!spawn.memory.jobList) {

            console.log("NEW GAME-No JOB MEMORY FOUND");
            spawn.memory.jobList = new Array();
            //var source = spawn.pos.findNearest(Game.SOURCES);
            //this.addToList(spawn,'mine_normal1', 'mine_normal', {miners:1,movers:2,source:source.id});
            //this.addToList(spawn,'mine_normal2', 'mine_normal', {miners:1,movers:2,source:source.id});
            //this.addToList(spawn,'wallofranged1', 'wallofranged', {rangers:2,healers:0,x:37,y:5,direction_x:1,healers_y:1});
            
        }



        //console.log (" - Jobs: "+Memory.jobList.length);
        for (var i in spawn.memory.jobList) {
            var job = spawn.memory.jobList[i];
            
            
            if (job.role=='mine_normal'){
                require('job_mine_normal').action(spawn,job);
            } 


        if (job.role=='wallofranged'){
            require('job_wallofranged').action(spawn,job);
        }
            
        }
    }
};

module.exports = jobManager;






