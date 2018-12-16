/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('FitLog.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },

    onNavToggle: function(button, pressed) {
        var treelist = this.lookupReference('treelist'),
            navBtn = this.lookupReference('navBtn'),
            ct = treelist.ownerCt;

        treelist.setMicro(pressed);

        if (pressed) {
            navBtn.setPressed(true);
            //navBtn.disable();
            navBtn.setTooltip('Expand Menu');
            this.oldWidth = ct.width;
            ct.setWidth(44);
        } else {
            navBtn.setTooltip('Collapse Menu');
            ct.setWidth(this.oldWidth);
            navBtn.enable();
        }
    },


    logout: function() {
        Ext.Ajax.abortAll();

        // set location path to /logout. and let server redirect appropriately.
        try {
            window.location.replace('/logout');
        } catch (e) {
            window.location.pathname = '/logout';
        }
    }

});
