Ext.require('Ext.data.proxy.Rest');

Ext.define('FitLog.store.Log', {
    extend: 'Ext.data.Store',
    requires: ['FitLog.model.Log'],
    model: 'FitLog.model.Log',
    storeId: 'idLogStore',
    alias: 'store.log',

    autoLoad: true,

    proxy: {
        type: 'rest',
        url: '/logs',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'count'
        },
        writer: {
            clientIdProperty: '_id'
        }
    }
});

Ext.create('FitLog.store.Log');
