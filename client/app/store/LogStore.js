Ext.require('Ext.data.proxy.Rest');

Ext.define('FitLog.store.Log', {
    extend: 'Ext.data.Store',
    requires: ['FitLog.model.Log'],
    model: 'FitLog.model.Log',
    alias: 'store.log',

    autoLoad: true,

    proxy: {
        type: 'rest',
        url: '/logs',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            clientIdProperty: '_id'
        }
    }
});
