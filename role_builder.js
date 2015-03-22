var role_builder = {
    
    //TODO
    base: function(creep) {
        
        // find target (but exclude spawn gaurds in march2015 survival game)
        var target = creep.pos.findClosest(Game.CONSTRUCTION_SITES);
        if(target) {
            creep.moveTo(target);
            creep.build(target);
        }
		
    },
 
 
 	wallofranged: function(creep,job,spot) {

        
    }
};

module.exports = role_builder;



