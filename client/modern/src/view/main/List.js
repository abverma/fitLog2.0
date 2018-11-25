/**
 * This view is an example list of people.
 */
Ext.define('FitLog.view.main.List', {
    extend: 'Ext.grid.Grid',
    xtype: 'mainlist',

    requires: [
        'FitLog.store.Log'
    ],

    title: 'Log',

    store: {
        type: 'log'
    },

    columns: [{
        text: 'Date',
        dataIndex: 'date',
        editor: {
            xtype: 'datefield'
        }
    }, {
        text: 'Exercise',
        dataIndex: 'exercise',
        flex: 1
    }, {
        text: 'Phone',
        dataIndex: 'phone',
        flex: 1
    }],


    listeners: {
        select: 'onItemSelected'
    }
});
