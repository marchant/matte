var Montage = require("montage").Montage;
var TestController = require("montage-testing/test-controller").TestController;

/**
* A Delegate to position the popup using custom logic
*/
var TestPopupPositionDelegate = Montage.specialize({
    willPositionPopup: {
       value: function(popup, anchor, anchorPosition) {
           if(anchor && anchorPosition) {
               if(window.innerHeight > 500 ){
                   return {
                       top: 10,
                       left: anchorPosition[0]
                   };
               } else {
                   return {
                       bottom: 10,
                       left: anchorPosition[0]
                   };
               }
           }
           return {top: 0, left: 0};
       }
    }
});
var aTestPopupPositionDelegate = new TestPopupPositionDelegate();

exports.PopupTest = TestController.specialize({
    deserializedFromTemplate: {
        value: function() {
            return this;
        }
    },

    popup: {
        value: null
    },

    popupContent: {
        value: null
    },

    popupButton: {
        value: null
    },

    handlePopupButtonAction: {
        value: function() {
            this.showPopup();
        }
    },

    /**

     @param
         @returns
     */
    showPopup:{
        value:function () {
          debugger;
            this.popup.delegate = aTestPopupPositionDelegate;
            if (this.popup.displayed) {

            this.popup.hide();
            } else {

            this.popup.show();
            }
        }
    }

});
