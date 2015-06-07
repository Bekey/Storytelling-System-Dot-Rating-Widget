/* ============================================
 * Storytelling System Dot Rating Widget v1.3
 * ========================================= */

(function ($) {
    "use strict";
    function SetDotRating(element, value) {
        element.children(".ss-dot").removeClass("ss-dot-marked");

        if(element.data("dot-color-empty")) {
          element.children(".ss-dot").css("background-color", element.data("dot-color-empty"));
        }

        if(element.data("dot-color-border")) {
          element.children(".ss-dot").css("border-color", element.data("dot-color-border"));
        }

        if(element.data("dot-color-marked")) {
          element.children(".ss-dot").slice(0, value).css("background-color", element.data("dot-color-marked"));
        }

        if (value > element.data("dot-min")) {
            element.children(".ss-dot").slice(0, value).addClass("ss-dot-marked");
            element.data("dot-value", value);
        } else {
            element.children(".ss-dot").slice(0, element.data("dot-min")).addClass("ss-dot-marked");
            element.data("dot-value", element.data("dot-min"));
        }
    }

    $.fn.DotRating = function () {
        var max, value;
        max = this.data("dot-max");
        value = this.data("dot-value");

        this.html((new Array(max + 1)).join("<div class='ss-dot'></div>"));
        SetDotRating(this, value);
        if (this.data("dot-is-squared") === true) {
            this.children(".ss-dot").addClass("ss-dot-xmark");
        }

        this.click(function (e) {
            var target = $(e.target);
            if (target.attr("id") !== $(this).attr("id")) {
                SetDotRating($(this), $(this).children(".ss-dot").index(target) + 1);
            } else {
                SetDotRating($(this), 0);
            }
        });
    };

    function SetHealthRating(element, bashing, lethal, aggravated) {
        element.children(".ss-health").removeClass("ss-health-bashing");
        element.children(".ss-health").removeClass("ss-health-lethal");
        element.children(".ss-health").removeClass("ss-health-aggravated");

        AddAggravated(element, aggravated);
        AddLethal(element, lethal);
        AddBashing(element, bashing);

        element.data("health-aggravated", element.children(".ss-health-aggravated").length);
        element.data("health-lethal", element.children(".ss-health-lethal").length);
        element.data("health-bashing", element.children(".ss-health-bashing").length);
    }

    function AddAggravated(element, value) {
      element.children(".ss-health").each(
        function() {
          if(!$(this).hasClass("ss-health-aggravated")) {
            if(value == 0) return;

            $(this).removeClass("ss-health-bashing");
            $(this).removeClass("ss-health-lethal");
            $(this).addClass("ss-health-aggravated");
            value--;
          }
        }
      );
    };

    function AddLethal(element, value) {
      element.children(".ss-health").each(
        function() {
          if(!$(this).hasClass("ss-health-aggravated")
          && !$(this).hasClass("ss-health-lethal")) {
            if(value == 0) return;

            $(this).removeClass("ss-health-bashing");
            $(this).addClass("ss-health-lethal");
            value--;
          }
        }
      );
      AddAggravated(element, value);
    };

    function AddBashing(element, value) {
      element.children(".ss-health").each(
        function() {
          if(!$(this).hasClass("ss-health-aggravated")
          && !$(this).hasClass("ss-health-lethal")
          && !$(this).hasClass("ss-health-bashing")) {
            if(value == 0) return;

            $(this).addClass("ss-health-bashing");
            value--;
          }
        }
      );
      AddLethal(element, value);
    };

    $.fn.AddDamage = function (bashing, lethal, aggravated) {
      bashing = Math.abs(bashing);
      lethal = Math.abs(lethal);
      aggravated = Math.abs(aggravated);

      var bashing_ = this.data("health-bashing");
      var lethal_ = this.data("health-lethal");
      var aggravated_ = this.data("health-aggravated");

      var empty = this.children(".ss-health").length;
      empty -= bashing_;
      empty -= lethal_;
      empty -= aggravated_;

      if(aggravated > 0 && empty - aggravated < 0) {
        for (var i = 0; i > empty - aggravated; i--) {
          if(bashing_ > 0) bashing_--;
          else if(lethal_ > 0) lethal_--;
        }
      }

      if(lethal > 0 && empty - lethal < 0) {
          for (var i = 0; i > empty - lethal; i--) {
            if(bashing_ > 0) bashing_--;
          }
      }

      bashing += bashing_;
      lethal += lethal_;
      aggravated += aggravated_;

      SetHealthRating(this, bashing, lethal, aggravated);
    }

    $.fn.HealDamage = function (bashing, lethal, aggravated) {
      bashing = Math.max(0, this.data("health-bashing") - bashing);
      lethal = Math.max(0, this.data("health-lethal") - lethal);
      aggravated = Math.max(0, this.data("health-aggravated") - aggravated);

      SetHealthRating(this, bashing, lethal, aggravated);
    }

    $.fn.HealthRating = function () {
        var max, bashing, lethal, aggravated;
        max = this.data("health-max");
        aggravated = Math.min(this.data("health-aggravated"), max);
        lethal = Math.min(this.data("health-lethal"), max - aggravated);
        bashing = Math.min(this.data("health-bashing"), max - aggravated - lethal);

        this.html((new Array(max + 1)).join("<div class='ss-health'></div>"));
        SetHealthRating(this, bashing, lethal, aggravated);
    };

})(window.jQuery);
