define([
    'core/js/adapt',
    'core/js/models/adaptModel',
    'core/js/views/adaptView',
], function (Adapt, AdaptModel, AdaptView) {

    var AdaptModelInitialize = AdaptModel.prototype.initialize;
    AdaptModel.prototype.initialize = function (options) {

        //extend the AdaptModel with new functionality

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

    /////////////////////////////////////////////////////////////////////////////////////////

    //below is optional - calls unlockelement() each time setCompletitionStatus() is called on a model
    //unlockelement() can be used on other events and conditions though
    //use this.model.unlockelement in views or this.unlockelement in models to call this function on events like setcompletitionstatus in view

    //Extends core/js/views/AdaptView.js
    var AdaptViewInitialize = AdaptView.prototype.initialize;
    AdaptView.prototype.initialize = function (options) {

        //extend the AdaptView with new functionality

        _.extend(this, {
            setCompletionStatus: function () {
                if (this.model.get('_isVisible')) {
                    //added unlockelement
                    this.model.unlockelement();
                    this.model.set({
                        '_isComplete': true,
                        '_isInteractionComplete': true
                    });
                }
            }
        });

        var returnValue = AdaptViewInitialize.apply(this, arguments);

        return returnValue;


    };

});
