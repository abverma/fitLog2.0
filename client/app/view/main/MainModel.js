/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('FitLog.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',
    data: {
        name: 'FitLog',
        userName: 'Ruchika Saini'
    },
    stores: {
        navItems: {
            type: 'tree',
            root: {
                expanded: true,
                children: [{
                    text: 'Home',
                    iconCls: 'x-fa fa-home',
                    style: 'font-weight: 300;',
                    leaf: true
                },{
                    text: 'Users',
                    iconCls: 'x-fa fa-user',
                    leaf: true
                },{
                    text: 'Settings',
                    iconCls: 'x-fa fa-cog',
                    leaf: true
                }]
            }
        }
    }


    //TODO - add data, formulas and/or methods to support your view
});
