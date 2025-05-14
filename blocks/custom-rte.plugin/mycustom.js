tinymce.PluginManager.add('mycustom', function (editor) {

    editor.ui.registry.addMenuButton('mycustom', {

        text: 'MyCustom',

        fetch: function (callback) {

            callback([

                {

                    type: 'menuitem',

                    text: 'Cust1',

                    onAction: function () {

                        editor.insertContent('<span>Cust1</span>');

                    }

                },

                {

                    type: 'menuitem',

                    text: 'Cust2',

                    onAction: function () {

                        editor.insertContent('<span>Cust2</span>');

                    }

                },

                {

                    type: 'menuitem',

                    text: 'Cust3',

                    onAction: function () {

                        editor.insertContent('<span>Cust3</span>');

                    }

                }

            ]);

        }

    });

});
