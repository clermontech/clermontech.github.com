/*!
 * William DURAND <william.durand1@gmail.com>
 * MIT Licensed
 *
 * Usage:
 *
 *     $('.photos').flickrPhotoStream({ id: '12345' });
 *
 *     $('.photos').flickrPhotoStream({
 *         id: '12345',             // Flickr PhotoStream Set ID
 *         container: '<div />',    // wrap the image
 *         cssClass: 'photos-item'  // applied to the image's link
 *     }).done(function () {});
 *
 */
(function (document, $) {
    "use strict";

    var flickrPhotoStream = function ($el, options) {
        var url = [
            'http://api.flickr.com/services/feeds/photos_public.gne?id=',
            options.id,
            '&format=json&jsoncallback=?'
        ].join('');

        var deferred = new $.Deferred();

        $.getJSON(url).done(function (data) {
            $.each(data.items, function (index, item) {
                var link = item.media.m.replace('_m', '_z');

                $("<img />")
                    .attr("src", item.media.m)
                    .appendTo($el)
                    .wrap(options.container || '')
                    .wrap([
                        '<a href="',
                        link,
                        options.cssClass ? '" class="' + options.cssClass : '',
                        '" title="',
                        item.title,
                        '"></a>'
                    ].join(''));
            });
        }).always(function () {
            deferred.resolve();
        });

        return deferred.promise();
    };

    $.fn.flickrPhotoStream = function (options) {
        return flickrPhotoStream($(this).get(), options || {});
    };
})(document, jQuery);
