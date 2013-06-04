/*!
 * William DURAND <william.durand1@gmail.com>
 * MIT Licensed
 */
(function (document, $) {
    "use strict";

    var flickrPhotoStream = function ($el, options) {
        var url = [
            'http://api.flickr.com/services/feeds/photos_public.gne?id=',
            options.id,
            '&format=json&jsoncallback=?'
        ].join('');

        $.getJSON(url, function (data) {
            $.each(data.items, function (index, item) {
                $("<img/>")
                    .attr("src", item.media.m)
                    .appendTo($el)
                    .wrap([
                        "<a href='",
                        // link to direct image:
                        // item.media.m.replace('_m', '_z'),
                        item.link,
                        "' class='",
                        options.cssClass,
                        "' title='",
                        item.title +"'></a>"
                    ].join(''));
            });
        });
    };

    $.fn.flickrPhotoStream = function (options) {
        flickrPhotoStream($(this).get(), options || {});

        return this;
    };
})(document, jQuery);
