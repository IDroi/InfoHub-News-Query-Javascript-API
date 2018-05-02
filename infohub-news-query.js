/*!
 * InfoHub News Query API
 * Copyright (c) 2018 Daniel Hsieh <daniel.hsieh@droi.com>
 * User can use this API to query InfoHub's news database.
 */

(function(root, factory) {
    factory(root.jQuery);
})(this, function($) {

    var NewsQuery = function(options) {
        this.options = $.extend({}, $.newsquery.defaults, options);
        this.rawData = undefined;
        this.cacheRawData = undefined;
        this.ih_slot_counter = 0;

        this.prerender();
    };

    NewsQuery.prototype = {
        constructor: NewsQuery,

        fetchNewsRawData: function(callback) {
            // https://pjchender.blogspot.tw/2016/03/javascriptthisbug.html
            var self = this;
            if(self.cacheRawData == undefined) {
                baasGetNewsAsync(self, function(data) {
                    self.rawData = data;
                    callback(self.rawData);

                    baasGetNewsAsync(self, function(data) {
                        self.cacheRawData = data;
                    });
                });
            } else {
                self.rawData = self.cacheRawData;
                callback(self.rawData);
                baasGetNewsAsync(self, function(data) {
                    self.cacheRawData = data;
                });
            }            
        },

        show: function() {
            this.refresh();
        },

        refresh: function() {
            var self = this;
            this.more(function() {
                $(self.options.appendToSelector).empty();
            });
        },

        more: function(ready_callback) {
            var self = this;
            this.fetchNewsRawData(function(data) {
                self.log();

                if(ready_callback != undefined) {
                    ready_callback();
                }
                
                data.forEach(function(element, index) {
                    if(index >= self.options.query_size) {
                        return;
                    }
                    var html = self.render(element, index);
                    $(self.options.appendToSelector).append(html);
                })
            });
        },

        prerender: function() {
            $(this.options.appendToSelector).empty();

            var pre_render_img_url = undefined;
            if(this.options.image_position == 'right') {
                pre_render_img_base64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wgARCAB4AV4DAREAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAMCBAEH/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAA+zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5gAAAAAAAAAADZYmSAAAAAANFwAAAAAAAAAAAAACZIAAAAAA0XABIAAAAAAAAAAA0bJkgAAAAADRcAEgAAAAAAAAAADRsmSAAAAAANFwAAAAAAAAAAAAACZIAAAAAA0XABzAAAAAAAAHp0AAAEyQAAAAABouAAAAAAAAAAAAAATJAAAAAAGi4AAAAAAAAAAAAABMkAAAAAAaLgAAAAAAAAAAAAAEyQAAAAABouAAAAAAAAAAAAAATJAAAAAAGi4AAAAAAAAAAAAABMkAAAAAAaLgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8QAIRAAAQQCAgIDAAAAAAAAAAAAAAMTMmIBMECBAhASIGD/2gAIAQEAAT8A/YpS69Kx73JzxzlY97k54+r1R6o9UeqPVHqj1R6o9UeqPVHqj1R6o9UeqPVHqj1R6o9UeqPVPBT5Z9Kx73Jzx9WbDNhmwzYZsM2GbDNhmwzYZsM2GbDNhmwzYZsM2GbDNhmwzYZseCfxz6Vj3uTnjnKx73JzxxvGWNCse9yc8c5WPe5OeOcrHvcnPHOVj3uTnjnKx73JzxzlY97k54/N/wD/xAAUEQEAAAAAAAAAAAAAAAAAAACQ/9oACAECAQE/ACU//8QAFBEBAAAAAAAAAAAAAAAAAAAAkP/aAAgBAwEBPwAlP//Z';
            } else {
                pre_render_img_base64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wgARCAB4AV4DAREAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAQBAwIH/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAA+zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmAAAAAABQaTmAAAAAAAAAHQ6gAAEwAAAAAAKDQAAAAAAAAAAAAACYAAAAAAFBpzMAAAAAAAAAABp0ABMAAAAAACg05mAAAAAAAAAAA06AAmAAAAAABQaAAAAAAAAAAAAAATAAAAAAAoNJzAAAAAAADsewAAAACYAAAAAAFBoAAAAAAAAAAAAABMAAAAAACg0AAAAAAAAAAAAAAmAAAAAABQaAAAAAAAAAAAAAATAAAAAAAoNAAAAAAAAAAAAAAJgAAAAAAUGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//EACMQAAIBBAEEAwEAAAAAAAAAAAATYgECMnEDEBFAUBIxYEH/2gAIAQEAAT8A/UW4010uyrvxOH++NbjTXrLcaa6V5e1fodEdEdEdEdEdEdEdEdEdEdEdEdEdEdEdEdEdEdEdEdEdEt5Pld27eHbjTXSvF3r9iZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZFvH8bu/fw7caa9ZbjTXS7Ku/A48KeVbjTXrLcaa9ZbjTXrLcaa9ZbjTX7T//xAAUEQEAAAAAAAAAAAAAAAAAAACQ/9oACAECAQE/ACU//8QAFBEBAAAAAAAAAAAAAAAAAAAAkP/aAAgBAwEBPwAlP//Z';
            }
            
            for(var i = 0; i < this.options.query_size; i++) {
                var news_element_type = 'news-element';
                if($(this.options.appendToSelector).children().length == 0) {
                    news_element_type = 'news-element-first';
                }
                
                var template = (
                    '<div class="' + news_element_type + '">' +
                        '<img class="pre-render-img" src="' + pre_render_img_base64 + '">' +
                    '</div>'
                )
                $(this.options.appendToSelector).append(template);
            }
        },

        render: function(element, index) {
            if(!element) {
                console.log('news element is null or undefined');
                return;
            }

            var title = element['title'];
            var like_numbers = element['like_numbers'];
            var unlike_numbers = element['unlike_numbers'];
            var source_name = element['source_name'];
            var source_date_int = element['source_date_int']
            var page_link = element['page_link'];

            var image_url = undefined;
            try {
                if(element['image_url_array'] != undefined) {
                    image_url = element['image_url_array'][0];
                    if(image_url.slice(-2) == '-c') {
                        image_url = image_url.substring(0, image_url.length - 2);
                    }
                }
            } catch(err) {
                console.log('error in image_url_array: ' + err.message);
            }

            // image div choice
            var main_image_style = '';
            var main_text_style = '';
            var main_text_part_layout_type = 'main-text-part';
            if(image_url == undefined) {
                main_text_part_layout_type = 'main-text-part-without-image';
                main_image_style = 'display:none';
            }

            if(this.options.image_position == 'left'){
                main_text_style = appendStyleString(main_text_style, 'margin-left:12px')
            } else {
                main_image_style = appendStyleString(main_image_style, 'margin-left:12px')
            }

            // individual part
            var text_div_html = (
                '<div class="' + main_text_part_layout_type + '" style="' + main_text_style + '">' + 
                    '<div class="top-layer">' + title + '</div>' +
                    '<div class="bottom-layer">' +
                        '<div class="bottom-text-part">' + source_name + '</div>' +
                        '<div class="bottom-icon-part">' +
                            '<span class="icon-image">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 155.123 155.123" style="enable-background:new 0 0 155.123 155.123;" xml:space="preserve" width="16px" height="13px">' +
                                    '<g><path d="M150.669,84.068c7.858-7.823,5.43-23.647-8.181-23.647l-35.813,0.024    c1.36-7.584,3.33-20.156,3.252-21.343c-0.752-11.242-7.918-24.924-8.228-25.484c-1.307-2.434-7.906-5.734-14.547-4.32    c-8.586,1.838-9.463,7.315-9.428,8.825c0,0,0.37,14.983,0.406,18.981c-4.105,9.016-18.259,32.71-22.549,34.536    c-1.026-0.621-2.19-0.955-3.401-0.955H6.934C3.091,70.685,0,73.793,0,77.618l0.006,62.533c0.269,3.371,3.133,6.015,6.516,6.015    h40.64c3.604,0,6.534-2.93,6.534-6.534v-2.076c0,0,1.51-0.113,2.196,0.328c2.613,1.659,5.842,3.747,10.054,3.747h60.647    c22.674,0,20.24-20.126,18.169-22.871c3.831-4.171,6.2-11.528,2.966-17.34C150.21,98.789,154.578,91.557,150.669,84.068z     M45.766,139.62H6.51V77.212h39.256V139.62z M140.09,83.531l-0.37,1.545c10.448,2.971,4.887,15.013-2.608,15.794l-0.37,1.545    c10.018,2.548,5.239,14.947-2.608,15.794l-0.37,1.539c8.181,1.343,6.2,15.305-6.194,15.305l-61.686,0.024    c-4.356,0-8.324-4.964-11.528-4.964H51.56V82.075c3.485-2.16,7.769-4.964,10.15-6.987c4.499-3.837,22.913-33.593,22.913-37.317    s-0.406-19.834-0.406-19.834s3.61-4.654,11.671-1.259c0,0,6.784,12.721,7.476,22.859c0,0-3.055,20.884-4.696,27.436h42.765    C151.94,66.985,149.935,81.986,140.09,83.531z" fill="#f15a59" /></g>' +
                                '</svg>' +
                            '</span>' +
                            '<span class="icon-number">' + like_numbers + '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            )
            var image_div_html = (
                '<div class="main-image-part" style="' + main_image_style + '">' +
                    '<img class="news-image" src="' + image_url + '">' +
                '</div>'
            )

            // image position
            if(this.options.image_position == 'left'){
                left_part_html = image_div_html;
                right_part_html = text_div_html;
            } else {
                left_part_html = text_div_html;
                right_part_html = image_div_html;
            }

            var news_element_type = 'news-element';
            if($(this.options.appendToSelector).children().length == 0) {
                news_element_type = 'news-element-first';
            }

            var open_method = 'location.href=\'' + page_link + '\'';
            if(this.options.open_new_window) {
                var open_method = 'window.open(\'' + page_link + '\')';
            }

            var template = (
                '<div class="' + news_element_type + '" onclick="' + open_method + '">' +
                    '<div class="main-layer">' + 
                        left_part_html +
                        right_part_html +
                    '</div>' +
                '</div>'
            )

            return template;
        },

        log: function() {
            console.log(this);
        }
    };

    $.newsquery = function(option) {
        // var $window = $(window);
        // var data = $window.data('newsquery');
        // var options = typeof option == 'object' && option;
        // if(!data) {
        //     $window.data('newsquery', (data = new NewsQuery(options)));
        // }
        // return data;
        var options = typeof option == 'object' && option;
        return new NewsQuery(options);
    };

    // override these globally if you like
    $.newsquery.defaults = {
        utm_source: 'infohub',
        utm_medium: 'javascript_api',
        utm_campaign: 'news_click',
        language: 'en',
        country: 'US',
        category: 'for you',
        query_size: 5,
        appendToSelector: '#news-container',
        image_position: 'right',
        open_new_window: true
    };

    String.prototype.format = function() {
        a = this;
        for(k in arguments) {
            a = a.replace("{" + k + "}", arguments[k]);
        }
        return a;
    };

    $.loadScriptSync = function(url, callback) {
        $.ajax({
            url: url,
            dataType: 'script',
            success: callback,
            async: false
        });
    };

    function baasGetNewsAsync(self, callback) {
        var ih_time = genIHTime();
        var ih_token = genIHToken(self.options);
        var ih_slot = self.ih_slot_counter++;
        var url = genURL(self.options, ih_time, ih_token, ih_slot);

        var socket = new XMLHttpRequest();
        console.log("GET: " + url);
        socket.open("GET", url, true);
        socket.setRequestHeader("X-Droi-AppID", "of2umbzhoAcZ8_DnHF95NP-1SLhCdahYlQDIVxMA");
        socket.setRequestHeader("X-Droi-Api-Key", "QUHbYv_gLs6ZzhddwPG0WNgQfRE65-sZkWSj-3mlee0lsqk2ri5bKKZDosbEI80r");
        socket.onreadystatechange = function() {
            if(socket.readyState == 4 && socket.status == 200) {
                var data = JSON.parse(socket.responseText);
                if(data['Code'] == 0 && data['Result'] != undefined && data['Result']['message'] == 'OK') {
                    var results = data['Result']['results'];
                    callback(results);
                } else {
                    console.log('something wrong in infohub server ...');
                    console.log(socket.responseText);
                }
                
            }
        }
        socket.send(null);
    }

    function genIHTime() {
        var t = Math.floor(Date.now() / 1000);
        t = t - t % 600;
        return t;
    }

    function genURL(options, ih_time, ih_token, ih_slot) {
        var u = "http://api.infohubapp.com/infohub_task_handler?task=get-news-data&api_version=1&language={0}&country={1}&category={2}&utm_source={3}&utm_medium={4}&utm_campaign={5}"
            .format(options['language'], options['country'], options['category'], options['utm_source'], options['utm_medium'], options['utm_campaign']);
        if(ih_time != undefined) {
            u += "&ih_time=" + ih_time;
        }
        if(ih_time != undefined) {
            u += "&ih_token=" + ih_token;
        }
        if(ih_time != undefined) {
            u += "&ih_slot=" + ih_slot
        }
        return u;
    }

    function genIHToken(options) {
        var t = genIHTime();
        var s = "ume_sZ3WSj";
        var u = genURL(options);
        var input = "{0}|{1}|{2}".format(t,s,u);
        var output = undefined;
        if (typeof md5 == 'undefined') {
            $.loadScriptSync('http://www.myersdaily.org/joseph/javascript/md5.js', function() {
                output = md5(input);
            });
        } else {
            output = md5(input);
        }
        return output;
    }

    function appendStyleString(styleString, style) {
        var returnString;
        if(styleString.length > 0) {
            returnString =  styleString + (";" + style);
        } else {
            returnString = style;
        }
        return returnString;
    }
});