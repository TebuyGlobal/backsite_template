$.TeBuy = {};

$.TeBuy.options = {
    // The standard screen sizes that bootstrap uses.
    // If change these in the "scss/bootstrap/variables.scss" file, change them here too.
    screenSizes: {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
    }
};

$(function() {
    // Initialize
    $.TeBuy.layout.activate();
    $.TeBuy.sideNav();
    $.TeBuy.pushMenu();
    $.TeBuy.switch();
    // Responsive pagination
    $('.pagination').rPage();
    // input number only
    $.TeBuy.inputNumberOnly();
    //nicescroll plugin
    var nicescrollOption = {
        cursoropacitymax: 0.5,
        cursorborder: "none",
        cursorwidth: "4px",
        autohidemode: false,
        bouncescroll: true,
        railpadding: { right: 1 }
    };

    if (!jQuery.browser.mobile) {
        $('.modal').on('shown.bs.modal', function() {
            $('.modal-open .modal').niceScroll(nicescrollOption);
        });
    };

});

/*!
 * jQuery Browser Plugin 0.1.0
 * https://github.com/gabceb/jquery-browser-plugin
 * Date: 23-11-2015
 */
 !function(a){"function"==typeof define&&define.amd?define(["jquery"],function(b){return a(b)}):"object"==typeof module&&"object"==typeof module.exports?module.exports=a(require("jquery")):a(window.jQuery)}(function(a){"use strict";function b(a){void 0===a&&(a=window.navigator.userAgent),a=a.toLowerCase();var b=/(edge)\/([\w.]+)/.exec(a)||/(opr)[\/]([\w.]+)/.exec(a)||/(chrome)[ \/]([\w.]+)/.exec(a)||/(iemobile)[\/]([\w.]+)/.exec(a)||/(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[],c=/(ipad)/.exec(a)||/(ipod)/.exec(a)||/(windows phone)/.exec(a)||/(iphone)/.exec(a)||/(kindle)/.exec(a)||/(silk)/.exec(a)||/(android)/.exec(a)||/(win)/.exec(a)||/(mac)/.exec(a)||/(linux)/.exec(a)||/(cros)/.exec(a)||/(playbook)/.exec(a)||/(bb)/.exec(a)||/(blackberry)/.exec(a)||[],d={},e={browser:b[5]||b[3]||b[1]||"",version:b[2]||b[4]||"0",versionNumber:b[4]||b[2]||"0",platform:c[0]||""};if(e.browser&&(d[e.browser]=!0,d.version=e.version,d.versionNumber=parseInt(e.versionNumber,10)),e.platform&&(d[e.platform]=!0),(d.android||d.bb||d.blackberry||d.ipad||d.iphone||d.ipod||d.kindle||d.playbook||d.silk||d["windows phone"])&&(d.mobile=!0),(d.cros||d.mac||d.linux||d.win)&&(d.desktop=!0),(d.chrome||d.opr||d.safari)&&(d.webkit=!0),d.rv||d.iemobile){var f="msie";e.browser=f,d[f]=!0}if(d.edge){delete d.edge;var g="msedge";e.browser=g,d[g]=!0}if(d.safari&&d.blackberry){var h="blackberry";e.browser=h,d[h]=!0}if(d.safari&&d.playbook){var i="playbook";e.browser=i,d[i]=!0}if(d.bb){var j="blackberry";e.browser=j,d[j]=!0}if(d.opr){var k="opera";e.browser=k,d[k]=!0}if(d.safari&&d.android){var l="android";e.browser=l,d[l]=!0}if(d.safari&&d.kindle){var m="kindle";e.browser=m,d[m]=!0}if(d.safari&&d.silk){var n="silk";e.browser=n,d[n]=!0}return d.name=e.browser,d.platform=e.platform,d}return window.jQBrowser=b(window.navigator.userAgent),window.jQBrowser.uaMatch=b,a&&(a.browser=window.jQBrowser),window.jQBrowser});

/* Fixes the layout
============================================================= */
$.TeBuy.layout = {
    activate: function() {
        this.fix();
        $(window, '.wrapper').resize(this.fix);
    },
    fix: function() {
        // Get window height and the wrapper height
        var window_height = $(window).height();
        $('.content-wrapper').css('min-height', window_height - $('.main-footer').outerHeight());
        $('.sidebar-menu').height($(window).height() - $('.main-header').height() - $('.sidebar-nav .user-panel').height());

        //slimscroll plugin
        // if (typeof $.fn.slimScroll != 'undefined') {
        //     //Destroy if it exists
        //     $('.sidebar-menu').slimScroll({ destroy: true }).height('auto');
        //     $('.sidebar-menu').slimscroll({
        //         height: ($(window).height() - $('.main-header').height() - $('.sidebar-nav .user-panel').height()) + 'px',
        //         color: 'rgba(0,0,0,0.5)',
        //         alwaysVisible: true,
        //         size: '8px' // sidenav scrollbar width
        //     });
        // }

        //elements equal height
        if ($('.equal-height').length) {
            var maxHeight = 0;
            $('.equal-height').each(function() {
                if ($(this).height() > maxHeight) {
                    maxHeight = $(this).height();
                }
            });
            $('.equal-height').height(maxHeight);
        };
    }
};

/* Sidebar pushmenu
============================================================= */

$.TeBuy.pushMenu = function() {
    //Get the screen sizes
    var $screenSizes = $.TeBuy.options.screenSizes;
    //Enable sidebar toggle
    $('.btn-side-toggle').on('click', function(e) {
        e.preventDefault();

        //Enable sidebar push menu
        if ($(window).width() > ($screenSizes.sm - 1)) {
            if ($('body').hasClass('sidebar-collapse')) {
                $('body').removeClass('sidebar-collapse').trigger('expanded.pushMenu');
            } else {
                $('body').addClass('sidebar-collapse').trigger('collapsed.pushMenu');
            }
        }
        //Handle sidebar push menu for small screens
        else {
            if ($('body').hasClass('sidebar-open')) {
                $('body').removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
            } else {
                $('body').addClass('sidebar-open').trigger('expanded.pushMenu');
            }
        }
    });

    $('.content-wrapper').click(function() {
        // Enable hide menu when clicking on the content-wrapper on small screens
        if ($(window).width() <= ($screenSizes.sm - 1) && $('body').hasClass('sidebar-open')) {
            $('body').removeClass('sidebar-open');
        }
    });
};

/* Sidebar dropdown
============================================================= */
$.TeBuy.sideNav = function() {
    var $menu = $('.sidebar-nav li a'),
        $speed = 300;

    $menu.click(function(e) {
        var $this = $(this),
            $parent = $this.parent();

        // expand
        if ($parent.has('.has-sub')) {
            $parent.toggleClass('expand');
            $this.next('ul').slideToggle($speed);
        };
        // collapse others
        $parent.siblings('.has-sub').removeClass('expand').find('ul:first').slideUp($speed);
    });
};

/* bootstrap-multiselect extension
============================================================= */

$.TeBuy.multiselect = function(target ,title) {

    if ($(target).length !== 0) {

        $(target).each(function() {
            if ($(this).not(':visible')) {
                $(this).multiselect({
                    buttonWidth: '100%',
                    includeSelectAllOption: true,
                    selectAllText: '選擇全部',
                    enableFiltering: true,
                    filterPlaceholder: "搜尋",
                    maxHeight: 350,
                    buttonText: function(options, select) {
                        if (options.length === 0) {
                            return title;
                        } else {
                            var labels = [];
                            options.each(function() {
                                if ($(this).attr('label') !== undefined) {
                                    labels.push($(this).attr('label'));
                                } else {
                                    labels.push($(this).html());
                                }
                            });
                            return labels.join(', ') + '';
                        }
                    }
                });
            }
        });
    }
}

/* Date Picker
============================================================= */
$.TeBuy.timePicker = function() {
    $('.time-picker').datetimepicker({
        format: 'A hh:mm',
        ignoreReadonly: true,
        useCurrent: false
    });
}

$.TeBuy.dateTimePicker = function() {
    $('.date-time-picker').datetimepicker({
        dayViewHeaderFormat: 'YYYY MMMM',
        format: 'YYYY/M/D HH:mm:ss',
        sideBySide: true,
        ignoreReadonly: true,
        useCurrent: false
    });
    $("input[name='time_st']").on("dp.change", function (e) {
        var start_ts = $('input[name="time_st"]').val().trim(),
            end_ts = $('input[name="time_et"]').val().trim();
        if ($('input[name="time_et"]').val() !== "" && Date.parse(start_ts).valueOf() > Date.parse(end_ts).valueOf()) {$('input[name="time_et"]').val('')};
        $('input[name="time_et"]').data("DateTimePicker").minDate(e.date);
    });
}

$.TeBuy.datePicker = function() {
    $('.date-time-picker').datetimepicker({
        dayViewHeaderFormat: 'YYYY MMMM',
        format: 'YYYY/M/D',
        ignoreReadonly: true,
        useCurrent: false
    });
}

/* switch
 =============================================================*/
 $.TeBuy.switch = function() {
    $('.switch-btn').on('click', function() {
        $(this).is(':checked') !== true ? $(this).attr('checked', false) : $(this).attr('checked', true);
    });
 }

/* 新增/移除 表單
============================================================= */
// clone form Elements
function addField(_this) {
    var $input = $(_this).parent('.input-group-btn').prev('input').val(), $name = $("input[name='format_name']").val();
    if ($input === "" || $name === "") {alert('請輸入規格名稱與規格項目。\n規格項目需以,符號分隔');return false};
    var $html = '', $string = makeid();
    $html += '<div class="clone-wrap cloned"><div class="row form-tight mb clone-obj"><ul><li><button type="button" class="btn btn-primary" onclick="editField($(this))"><i class="fa fa-pencil"></i></button></li><li><button type="button" class="btn btn-danger" onclick="delField($(this))"><i class="fa fa-trash-o"></i></button></li></ul><div class="col-lg-3 mb-lg"><input type="text" class="form-control" placeholder="規格名稱" readonly="readonly" value="' + $name +'"></div><div class="col-lg-9 "><input type="text" class="form-control" placeholder="輸入規格項目，並以,分隔" readonly="readonly" value="' + $input +'"></div></div></div>';
    // clone
    $('.place-wrap').append($html);
    $('.format-wrap').show();
    $(_this).parent('.input-group-btn').prev('input').val('');
    $("input[name='format_name']").val("");
};

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function delField($this) {
    var $wrap = $this.closest('.clone-wrap');
    // remove finished
    $wrap.remove().promise().done(function() {
        if ($('.clone-wrap').length === 0) {
            $('.format-wrap').hide();
        }
    })
};

function editField($this) {
    var $wrap = $this.closest('.clone-wrap');
    $wrap.find('input[type="text"]').removeAttr('readonly');
    $wrap.find('input').eq(0).focus();
    $this.parent('li').append('<button type="button" class="btn btn-success" onclick="checkField($(this))"><i class="fa fa-check"></i></button>');
    $this.remove();
};

function checkField($this) {
    var $wrap = $this.closest('.clone-wrap'), $input = $wrap.find('input');
    if ($input.eq(0).val() === "" || $input.eq(1).val() === "") {alert('規格名稱與規格項目不可為空。\n規格項目需以,符號分隔');return false};
    $wrap.find('input[type="text"]').attr('readonly', true);
    $this.parent('li').append('<button type="button" class="btn btn-primary" onclick="editField($(this))"><i class="fa fa-pencil"></i></button>');
    $this.remove();
}

/* input只能填數字
============================================================= */
$.TeBuy.inputNumberOnly = function() {
    $(document).on('keypress', '.number-only', function(e) {

        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {

            if ($(this).next('.tooltip').length) return false;
            $(this).attr('title', ' 只能輸入數字! ').tooltip('show');
            return false;

        } else {
            $(this).tooltip('destroy');
        }
    });
};

/*!========================================================================
 * listgroup.js v1.1.2
 * http://rickardn.github.io/listgroup.js
 * ======================================================================== */
+function(n){"use strict";var i=function(t,i){this.$element=n(t);this.options=i||{};this.init()},t;i.prototype.init=function(){var r=this,i=this.$element,t=this.options;t.toggle&&i.attr("data-toggle",t.toggle);i.on("click",".list-group-item",function(){var u=n(this);return u.hasClass("disabled")||(i.data("toggle")=="items"?u.toggleClass("active"):r.unselect("*").select(u),t.click&&t.click.apply(this)),u.blur(),!1})};i.prototype.select=function(t){var i,r;if(t instanceof n&&t.addClass("active"),typeof t=="string"&&(t=[t]),Array.isArray(t))for(i in t)r=t[i],this.$element.find(".list-group-item[data-value='"+r+"']").addClass("active");return this};i.prototype.unselect=function(n){return this.$element.find(".list-group-item").filter(n||"*").removeClass("active"),this};t=function(t,i){this.$element=n(t);this.options=i;this.$listGroup=this.createListGroup()};t.prototype.select=function(t){if(t instanceof n){var i=[];t.each(function(t,r){i.push(n(r).val())});t=i}this.$element.val(t).change()};t.prototype.unselect=function(n){var t=this.$element.val(),i;Array.isArray(t)||(t=[t]);Array.isArray(n)||(n=[n]);for(i in n)t.pop(n[i]);this.$element.val(t).change()};t.prototype.createListGroup=function(){var t=this.$element,i=n("<ul>").addClass("list-group selectable");return t.attr("multiple")&&i.attr("data-toggle","items"),t.find("option").each(function(t,r){var u=n(r),f=n("<a>").attr("href","#").addClass("list-group-item").attr("data-value",u.val()).text(u.text());u.is(":disabled")&&f.addClass("disabled");u.css("display")==="none"&&f.addClass("hidden");i.append(f)}),t.change(function(){i.listgroup({unselect:"*",select:t.val()})}),i.listgroup({select:t.val(),click:function(){var r=[];i.find(".list-group-item.active").each(function(t,i){var u=n(i).data("value");r.push(u)});r.length==1&&(r=r[0]);t.val(r)}}),t.before(i),this.$listGroup=i,t.hide(),i};n.fn.listgroup=function(r){return this.each(function(u,f){var o=n(f),e=o.data("listgroup");e||o.data("listgroup",e=o.is("select")?new t(f,r):new i(f,r));r&&(r.unselect&&e.unselect(r.unselect),r.select&&e.select(r.select))})};n(function(){n(".list-group").listgroup()})}(jQuery);
