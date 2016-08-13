/*
 * A plugin for making Bootstrap's pagination more responsive
 * https://github.com/auxiliary/rpage
 */
!function(a){jQuery.fn.rPage=function(){function e(b){this.label=function(){var b=this.els.filter(".active").index(),c=this;this.els.each(function(){0==c.isNextOrPrevLink(a(this))?a(this).addClass("page-away-"+Math.abs(b-a(this).index()).toString()):a(this).index()>b?a(this).addClass("right-etc"):a(this).addClass("left-etc")})},this.makeResponsive=function(){this.reset();for(var a=this.calculateWidth();a>this.els.parent().parent().outerWidth()-10;){var b=this.removeOne();if(0==b)break;a=this.calculateWidth()}},this.isNextOrPrevLink=function(a){return a.hasClass("pagination-prev")||a.hasClass("pagination-next")||"\xbb"==a.text()||"\xab"==a.text()},this.isRemovable=function(a){if(this.isNextOrPrevLink(a))return!1;var c=this.els.filter(a).index();return 1==c||this.isNextOrPrevLink(b.find("li").eq(c+1))?!1:"..."==a.text()?!1:!0},this.removeOne=function(){for(var a=this.els.filter(".active").index(),c=b.find("li").length-1,f=c-1;f>0;f--){var g=this.els.filter(".page-away-"+f.toString()),h=g.filter(function(){return"none"!=this.style.display});if(h.length>0)for(var i=0;i<h.length;i++){var j=h.eq(i);if(this.isRemovable(j))return j.css("display","none"),this.needsEtcSign(a,c-1)&&this.els.eq(c-2).before("<li class='disabled removable'><span>...</span></li>"),this.needsEtcSign(1,a)&&this.els.eq(1).after("<li class='disabled removable'><span>...</span></li>"),!0}}return!1},this.needsEtcSign=function(a,c){if(1>=c-a)return!1;for(var d=!1,e=!1,f=a+1;c>f;f++){var g=b.find("li").eq(f);"none"==g.css("display")&&(e=!0),"..."==g.text()&&(d=!0)}return 1==e&&0==d?!0:!1},this.reset=function(){for(var a=0;a<this.els.length;a++)this.els.eq(a).css("display","inline");b.find("li").filter(".removable").remove()},this.calculateWidth=function(){for(var a=0,c=0;c<b.find("li").length;c++)a+=b.find("li").eq(c).children("a").eq(0).outerWidth(),a+=b.find("li").eq(c).children("span").eq(0).outerWidth();return a},this.els=b.find("li"),this.label(),this.makeResponsive();var c;a(window).resize(a.proxy(function(){clearTimeout(c),c=setTimeout(a.proxy(function(){this.makeResponsive()},this),100)},this))}for(var b=a(this),c=0,d=b.length;d>c;c++)new e(a(b[c]))}}(jQuery);