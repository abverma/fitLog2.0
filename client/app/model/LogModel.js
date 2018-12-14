Ext.define('FitLog.model.Log', {
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: [{
        name: '_id'
    }, {
        name: 'workout'
    }, {
        name: 'date'
    }, {
    	name: 'cardio',
    	type: 'boolean',
    	default: false
    }, {
    	name: 'hiit',
    	type: 'boolean',
    	default: false
    }, {
    	name: 'abs',
    	type: 'boolean',
    	default: false
    }, {
    	name: 'comments'
    }]
});
