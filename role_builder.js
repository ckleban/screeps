var role_builder = {
    
    //TODO
    base: function(creep) {
        
        // find target (but exclude spawn gaurds in march2015 survival game)
        
        
        
        var target = creep.pos.findClosest(Game.CONSTRUCTION_SITES);
        if(target) {
            if(creep.energy < 1) {
                var spawn = creep.pos.findNearest(Game.MY_SPAWNS);
                creep.moveTo(spawn);
                creep.pickup(spawn);
            } else {
                creep.moveTo(target);
                creep.build(target);
            }
        } else {
            //creep.moveTo(42,5);
            var fixtarget = creep.pos.findClosest(Game.MY_STRUCTURES, {
                filter: function(object) {
                    return object.hits < object.hitsMax;
                }
            });
            if(fixtarget) {
                if(creep.energy < 1) {
                    var spawn = creep.pos.findNearest(Game.MY_SPAWNS);
                    creep.moveTo(spawn);
                    creep.pickup(spawn);
                } else {
                    creep.moveTo(fixtarget);
                    creep.repair(fixtarget);
                }
                //creep.moveTo(target);
                //creep.repair(target);
            }
        }
        
        
        
    },
 
 
 	wallofranged: function(creep,job,spot) {

        
    }
};

module.exports = role_builder;



