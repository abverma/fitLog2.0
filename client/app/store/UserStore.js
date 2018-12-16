Ext.require('Ext.data.proxy.Rest');

Ext.define('FitLog.store.UserStore', {
    extend: 'Ext.data.Store',
    storeId: 'idUserStore',
    alias: 'store.userStore',

    autoLoad: true,

    proxy: {
        type: 'rest',
        url: '/currentUser',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.create('FitLog.store.UserStore');
