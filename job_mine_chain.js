/**
 * creepFactory
 */
 var job_mine_chain = {


     
     init: function(spawn,job) {
         var path = creep.room.findPath(spawn, job.jobmemory.source, {ignoreCreeps: true});
         for (var yy in path) {
             var location=path[yy];
             job.jobmemory.locations[yy] = location;
             
         }
     }, 
     

//untested

     increase: function(spawn,job,increase,role) {
        job.jobmemory[role+'s']=job.jobmemory[role+'s']+increase;
     },

     //untested
     decrease: function(spawn,job,decrease) {
         job.jobmemory.rangers=job.jobmemory.rangers-decrease;
         for (var x = job.jobmemory.rangers; x < 0; x--) {
             console.log(x);
             job.jobmemory.ranger[x]=null;
             var creep = Game.getObjectById(job.jobmemory.ranger[x]);
             creep.memory.job_active='false';
             creep.memory.job_pos=null;
             creep.memory.job=null;
             job.jobmemory.ranger.splice(x,1);
         }
     },


     action: function (spawn,job) {
         //console.log ("Ranged Job: Rangers=" + job.jobmemory.rangers);
         
         
            
        var  roles=['miner-chain','mover-chain'];
        for (var i in roles){
            var role = roles[i];
       
            // If this is a new JOB, init the job
            if(!job.jobmemory[role]){ 
                job.jobmemory.health = 'starting';
                job.jobmemory[role] = new Array();
            
            
                for (var x = 0; x < job.jobmemory[role+'s']; x++) {
                    // Find or make creeps needed for Job
                    require('jobManager').initJobCreepAllocator(spawn,job,role,x);
                }
                // If this job is not new            
                } else {   
                    var numCreeps = 0;
            
                    // Check if we need creeps (creep died, or size changed)
                    for (var x = 0; x < job.jobmemory[role+'s']; x++) {
       
                        // Find or make creeps needed for Job
                        require('jobManager').initJobCreepAllocator(spawn,job,role,x);
                
               
                        // TODO: put logic in here to free up creeps on this job if job shrinks or gets deleted
        
                        //If we are waiting on spawning, look for new creep
                        if (job.jobmemory[role][x]=='spawning'){
                            require('jobManager').initJobCreepSpawnChecker(spawn,job,role,x);
                            //If we have a creep, use the creep	        
                        } else {
                            //TODO: Need to move numCreeps to memory and fix logic in/out functions
                            var haveCreep=require('jobManager').handleCreepActions(spawn,job,role,x);
                            numCreeps=numCreeps+haveCreep;
  
                   
                        }
               
                    } // end for loop
             
                    //Check if we have all the desired creeps
                    if (numCreeps==job.jobmemory[role+'s']){
                        job.jobmemory.health = 'healthy';
                    }
                
                
       
       
                }    //end else


        } //end roles for loop       
     } //end action


 };

module.exports = job_mine_chain;
