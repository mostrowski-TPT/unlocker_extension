define([
    'core/js/adapt',
    'core/js/models/adaptModel',
], function (Adapt, AdaptModel) {

    var AdaptModelInitialize = AdaptModel.prototype.initialize;
    AdaptModel.prototype.initialize = function (options) {

        //extend the articleModel with new functionality

        _.extend(this, {
            unlockelement: function () {

                var unlockingitems = this.get("_unlockingItems");
                _.each(unlockingitems, function (item) {
                    var itemid = item._unlockId;
                    var itemmodel = Adapt.findById(itemid);
                    itemmodel.set("_isHidden", false);
                });
            }
        });

        var returnValue = AdaptModelInitialize.apply(this, arguments);

        return returnValue;

    };

});






//paste this extension to the extensions
//use this.model.unlockelement in views or this.unlockelement in models to call this function on events like setcompletitionstatus in view

//
