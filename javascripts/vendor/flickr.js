/*!
 * William DURAND <william.durand1@gmail.com>
 * MIT Licensed
 *
 * GistID: 5705453
 *
 * Usage:
 *
 *     $('.photos').flickrPhotoStream({ id: '12345', setId: '67890' });
 *
 *     $('.photos').flickrPhotoStream({
 *         id: '12345',             // Flickr Id
 *         setId: '67890',          // Flick "Set" Id
 *         container: '<div />',    // wrap the image
 *         cssClass: 'photos-item'  // applied to the image's link
 *     }).done(function () {});
 *
 */
(function (document, $) {
    "use strict";

    var flickrPhotoStream = function ($el, options) {
        var url = [
            'https://api.flickr.com/services/feeds/photoset.gne?nsid=',
            options.id,
            '&set=',
            options.setId,
            '&format=json&jsoncallback=?'
        ].join('');

        return $.getJSON(url).done(function (data) {
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
        });
    };

    $.fn.flickrPhotoStream = function (options) {
        return flickrPhotoStream($(this).get(), options || {});
    };
})(document, jQuery);
