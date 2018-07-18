define([
    'coreJS/adapt',
    'core/js/models/adaptModel'
],function(Adapt, adaptModel) {

    Adapt.Model = _.extend({

        unlockelement: function(event){
            event.preventDefault();
            var unlockingitems = this.get("_unlockingItems");
            _.each(unlockingitems, function (item) {
                var itemid = item._unlockId;
                var itemmodel = Adapt.findById(itemid);
                itemmodel.set("_isHidden", false);
            }); 
        }   
    });

});
