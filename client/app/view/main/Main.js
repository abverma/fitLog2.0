/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('FitLog.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'FitLog.store.UserStore',
        'FitLog.view.main.MainController',
        'FitLog.view.main.MainModel',
        'FitLog.view.main.Log'
    ],
    viewModel: 'main',
    controller: 'main', 
    layout: 'border',
    items: [{
        region: 'west',
        width: 250,
        reference: 'treelistContainer',
        bodyStyle: 'background: #32404e;',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        border: false,
        scrollable: 'y',
        items: [{
            ui: 'navheader',
            header: {
                layout: {
                    align: 'stretchmax'
                },
                title: {
                    bind: {
                        text: '{name}'
                    },
                    flex: 0
                },
                iconCls: 'fa-th-list'
            }
        }, {
            xtype: 'treelist',
            reference: 'treelist',
            expanderFirst: false,
            highlightedPath: true,
            ui: 'nav',
            bind: '{navItems}'
        }]
    }, {
        region: 'center',
        //bodyPadding: 10,
        bodyStyle: 'background: #f6f6f6;',
        tbar: {
            ui: 'maintoolbar',
            items: [{
                xtype: 'button',
                reference: 'navBtn',
                tooltip: 'Collapse Menu',
                style: 'background: transparent;',
                iconCls: 'x-fa fa-align-justify',
                enableToggle: true,
                toggleHandler: 'onNavToggle'
            }, '->', {
                xtype: 'tbtext',
                listeners: {
                    render: function(cmp, eOpts) {
                        var userStore = Ext.data.StoreManager.lookup('idUserStore');
                        userStore.on('load', function(store, records){
                            var name = records[0].get('firstName');
                            name = name.charAt(0).toUpperCase() + name.slice(1);
                            cmp.setBind(name);
                        });
                    }
                }
            },{
                xtype: 'button',
                tooltip: 'Logout',
                style: 'background: transparent;',
                iconCls: 'x-fa fa-power-off',
                handler: 'logout'
            }]
        },
        items: [{
            style: 'top: 15px; padding: 8px;',
            scrollable: 'y',
            items:[{
                xtype: 'logview'
            }]
        }]
    }]
});
