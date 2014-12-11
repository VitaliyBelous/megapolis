(function($) {
    $.fn.carousel = function(options) {

        var Carousel = function(container, options) {
            this.$container = $(container);
            $.extend(this.options, options);
            this.$container.find(this.options.rightArrow)
                .add(this.$container.find(this.options.leftArrow))
                .click({that: this}, this.move);
        };

        Carousel.prototype.options = {
            speed: 500,
            leftArrow: '.s-left a',
            rightArrow: '.s-right a',
            slidesSelector: 'li'
        };

        Carousel.prototype.move = function(event) {
            event.preventDefault(); //Предотвращаем стандартное действие по клику стрелки
            var that = event.data.that;
            var $container = that.$container;
            var $slides = $container.find(that.options.slidesSelector);
            if ($slides.is(':animated')) { //Предотвращаем преждевременную анимацию
                return false;
            }

            var speed = that.options.speed;
            $.each($slides, function(index) {
                var position = $(this).position();

                if ($(event.target).is($(that.options.rightArrow))) {
                    if (index == 0) {
                        $slides.last().clone().hide().prependTo($container.find('ul')).css(position).fadeIn(speed);//Клонирование и перенос последнего элемента массива на первую позицию в блоке с функцией плавного исчезновения/появления
                        $slides.eq(-1).fadeOut(speed, function () {
                            $(this).remove();//Последний элемент удаляем
                        });
                    }
                    $(this).prev().animate(position, speed); // Перенос всех элементов на следующую позицию
                } else if ($(event.target).is($(that.options.leftArrow))) {
                    if (index == $slides.length - 1) {
                        $slides.first().clone().hide().appendTo($container.find('ul')).css(position).fadeIn(speed); //Клонирование и перенос первого элемента массива на последнюю позицию в блоке с функцией плавного исчезновения/появления
                        $slides.eq(0).fadeOut(speed, function () {
                            $(this).remove();
                        });
                    }
                    $(this).next().animate(position,speed); // Перенос всех элементов на предидущую позицию
                }
            });
        };

        $(this).each(function() {
            new Carousel(this, options);
        });
    };
})(jQuery);


