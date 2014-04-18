(function($, window, document, undefined) {
    var config = {
        action: 'append',       // How to put the rendered template on the page
        effect: 'slideDown',    // Which effect to use when putting the rendered template on the page
        speed: 1000,            // The speed of the above effect
        data: {},               // The data to send to the PHP script
        mobile: false,          // Wether or not to load a different template with the 'mobile-' prefix when the page if viewed on a mobile platform
        before: false,          // Optional callback function to use before the rendered template is put on the page
        after: false            // Optional callback function to use after the rendered template is put on the page
    };

    var methods = {
        /** ------------------------------------------------------------------------
         * Initialize
         * @param $selector
         */
        init: function($selector) {
            // Is the 'before' callback set?
            if(typeof config.before == 'function') {
                config.before();
            }

            // Make a request to the PHP file
            var dataRequest = methods.request(config.file, config.data);

            dataRequest.done(function(data) {

                // Holds the filepath to the template
                var template;

                // Check if the user has mobile templates available
                if(config.mobile === true) {
                    // Check if the page is being viewed on a mobile device
                    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                        // Get the filename for the template and prepend 'mobile-'
                        template = 'templates/mobile-' + config.template.replace(/^.*[\\\/]/, '');
                    } else {
                        // Else set the filename to the normal template
                        template = config.template;
                    }
                } else {
                    // Else set the filename to the normal template
                    template = config.template;
                }

                // Retrieve the template
                var templateRequest = methods.template(template);

                templateRequest.done(function(html) {

                    // Render the data and the template
                    var rendered = methods.render(data, html);

                    // Is the 'after' callback set?
                    if(typeof config.after == 'function') {
                        config.after();
                    }

                    // Place the content on the page
                    methods[config.action]($selector, rendered);
                });
            });
        },
        /** ------------------------------------------------------------------------
         * Make the AJAX request to a PHP script
         * @param file
         * @param data
         * @returns {*}
         */
        request: function(file, data) {
            return $.ajax({
                type: 'POST',
                url: file,
                data: data,
                dataType: "json"
            });
        },
        /** ------------------------------------------------------------------------
         * Make the AJAX request to retrieve the html for the template
         * @param template
         * @returns {*}
         */
        template: function(template) {
            return $.ajax({
                url: template,
                dataType: "html"
            });
        },
        /** ------------------------------------------------------------------------
         * Place the data in the template by replacing all the placholders
         * @param data
         * @param template
         * @returns {string}
         */
        render: function(data, template) {
            var html = '';

            for(var i=0; i<data.length; i++) {
                html += template;

                $.each(data[i], function(k, v) {
                    html = html.replace('{{' + k + '}}', v);
                });
            }

            return html;
        },
        /** ------------------------------------------------------------------------
         * Prepend the rendered html to the selector
         * @param $selector
         * @param html
         */
        prepend: function($selector, html) {
            $selector.prepend(html).hide()[config.effect](config.speed);
        },
        /** ------------------------------------------------------------------------
         * Append the rendered html to the selector
         * @param $selector
         * @param html
         */
        append: function($selector, html) {
            $selector.append(html).hide()[config.effect](config.speed);
        },
        /** ------------------------------------------------------------------------
         * Replace the contents of the selector with the rendered html
         * @param $selector
         * @param html
         */
        replace: function($selector, html) {
            $selector.html(html).hide()[config.effect](config.speed);
        },
        /** ------------------------------------------------------------------------
         * Put the rendered html before the selector
         * @param $selector
         * @param html
         */
        before: function($selector, html) {
            $selector.before(html).hide([config.effect](config.speed));
        },
        /** ------------------------------------------------------------------------
         * Put the rendered html after the selector
         * @param $selector
         * @param html
         */
        after: function($selector, html) {
            $selector.after(html).hide()[config.effect](config.speed);
        }
    };

    $.fn.template = function(options) {
        // Extend the configuration
        $.extend(config, options);

        methods.init(this);

        return this;
    }
}(jQuery, window, document));