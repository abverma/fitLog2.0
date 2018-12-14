/**
 * This view is an example list of people.
 */
Ext.define('FitLog.view.main.Log', {
    extend: 'Ext.grid.Panel',
    xtype: 'logview',
    requires: [
        'FitLog.store.Log'
    ],
    title: 'Log',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
        pluginId: 'rowEditor'
    },
    selModel: {
        selType: 'checkboxmodel',
        checkOnly: true,
        mode: 'SIMPLE'
    },
    store: 'idLogStore',
    tbar: {
        items: ['->', {
            xtype: 'button',
            text: 'Add',
            handler: function() {
                var grid = this.up('grid');
                if (grid) {
                    var store = this.up('grid').getStore();
                    if (store) {
                        var newRecord = store.getModel().create();
                        store.insert(0, newRecord);

                        var started = grid.getPlugin('rowEditor').startEditByPosition({
                            row: 0,
                            column: 0
                        });
                    }
                }
            }
        }, {
            xtype: 'button',
            text: 'Delete',
            handler: function() {
                var grid = this.up('grid');
                grid.deleteRecords();
            }
        }, {
            xtype: 'button',
            text: 'Save',
            handler: function() {
                var grid = this.up('grid');
                if (grid) {
                    var store = this.up('grid').getStore();

                    if (store) {
                        if (grid.isDirty()) {
                            grid.mask('Saving..');

                            store.sync({
                                callback: function() {
                                    grid.unmask();
                                    Ext.Msg.alert('Save', 'Save successfully.');
                                }
                            });
                        }
                    }
                }

            }
        }, {
            xtype: 'button',
            text: 'Reset',
            handler: function() {
                var grid = this.up('grid');
                if (grid) {
                    var store = this.up('grid').getStore();
                    if (store) {
                        store.reload();
                    }
                }
            }
        }, {
            xtype: 'button',
            text: 'Add Column',
            handler: function() {
                var grid = this.up('grid');
                var column = Ext.create('Ext.grid.column.Column', {
                    text: 'AButton'
                });
                // add column to the end
                grid.headerCt.insert(++grid.columns.length, column);
                // refresh view
                grid.getView().refresh();
            }
        }]
    },
    bbar: Ext.create('Ext.PagingToolbar', {
        store: 'idLogStore',
        displayInfo: true,
        displayMsg: 'Displaying topics {0} - {1} of {2}',
        emptyMsg: "No topics to display"
    }),
    columns: [{
        xtype: 'datecolumn',
        text: 'Date',
        dataIndex: 'date',
        editor: {
            xtype: 'datefield',
            format: 'd-M-y'
        },
        align: 'left',
        renderer: Ext.util.Format.dateRenderer('d-M-y'),
        flex: .2
    }, {
        text: 'Workout',
        dataIndex: 'workout',
        editor: {
            xtype: 'textfield'
        },
        align: 'left',
        flex: .3
    }, {
        text: 'Sets',
        dataIndex: 'sets',
        editor: {
            xtype: 'numberfield',
            hideTrigger: true
        },
        align: 'left',
        flex: .2
    }, {
        text: 'Reps',
        dataIndex: 'reps',
        editor: {
            xtype: 'numberfield',
            hideTrigger: true
        },
        align: 'left',
        flex: .2
    }, {
        text: 'Cardio',
        dataIndex: 'cardio',
        editor: {
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'display',
            valueField: 'value',
            forceSelection: true,
            anyMatch: true,
            store: {
                data: [{
                    display: 'Yes',
                    value: true
                }, {
                    display: 'No',
                    value: false
                } ]
            }
        },
        align: 'left',
        renderer: function(value) {
            if (value) {
                return 'Yes'
            } else {
                return 'No'
            }
        },
        flex: .2
    }, {
        text: 'HIIT',
        dataIndex: 'hiit',
        editor: {
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'display',
            valueField: 'value',

            store: {
                data: [{
                    display: 'Yes',
                    value: true
                }, {
                    display: 'No',
                    value: false
                } ]
            }
        },
        align: 'left',
        renderer: function(value) {
            if (value) {
                return 'Yes'
            } else {
                return 'No'
            }
        },
        flex: .2
    }, {
        text: 'Abs',
        dataIndex: 'abs',
        editor: {
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'display',
            valueField: 'value',

            store: {
                data: [{
                    display: 'Yes',
                    value: true
                }, {
                    display: 'No',
                    value: false
                } ]
            }
        },
        align: 'left',
        renderer: function(value) {
            if (value) {
                return 'Yes'
            } else {
                return 'No'
            }
        },
        flex: .2
    }, {
        text: 'Comments',
        dataIndex: 'comments',
        editor: {
            xtype: 'textarea'
        },
        align: 'left',
        flex: .4
    }],

    listeners: {
        //select: 'onItemSelected'
    },

    deleteRecords: function() {
        var sm = this.getSelectionModel();
        if (this.getPlugin('rowEditor')) {
            this.getPlugin('rowEditor').cancelEdit();
        }
        var store = this.getStore();

        store.remove(sm.getSelection());
    },

    isDirty: function() {
        var store = this.getStore();
        var dirty = false;

        if (store.getNewRecords() && store.getNewRecords().length) {
            dirty = true;
        }

        if (store.getModifiedRecords() && store.getModifiedRecords().length) {
            dirty = true;
        }

        if (store.getRemovedRecords() && store.getRemovedRecords().length) {
            dirty = true;
        }

        return dirty;
    }
});