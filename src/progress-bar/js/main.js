jQuery(function($) {
    var $progress = $(".progress-calendar");

    function getCompletion() {
        var now = new Date(),
            fullYear = now.getFullYear(),
            month = now.getMonth(),
            day = now.getDate(),
            hour = now.getHours(),
            min = now.getMinutes(),
            startOfYear = new Date(fullYear, 0, 1),
            startOfNextYear = new Date(fullYear + 1, 0, 1),
            startOfMonth = new Date(fullYear, month, 1),
            startOfNextMonth = new Date(fullYear, month + 1, 1),
            startOfDay = new Date(fullYear, month, day),
            startOfHour = new Date(fullYear, month, day, hour, 0, 0),
            startOfMin = new Date(fullYear, month, day, hour, min, 0),
            // year completion
            ticksThisYear = startOfNextYear - startOfYear,
            ticksSinceYearStarted = now - startOfYear,
            yearCompletion = (ticksSinceYearStarted / ticksThisYear) * 100,
            // month completion
            ticksThisMonth = startOfNextMonth - startOfMonth,
            ticksSinceMonthStarted = now - startOfMonth,
            monthCompletion = (ticksSinceMonthStarted / ticksThisMonth) * 100,
            // day completion
            ticksThisDay = 24*60*60*1000,
            ticksSinceDayStarted = now - startOfDay,
            dayCompletion = (ticksSinceDayStarted / ticksThisDay) * 100,
            // hour completion
            ticksThisHour = 60*60*1000,
            ticksSinceHourStarted = now - startOfHour,
            hourCompletion = (ticksSinceHourStarted / ticksThisHour) * 100,
            // min completion
            ticksThisMin = 60*1000,
            ticksSinceMinStarted = now - startOfMin,
            minCompletion = (ticksSinceMinStarted / ticksThisMin) * 100;
            
        return {
            year: yearCompletion,
            month: monthCompletion,
            day: dayCompletion,
            hour: hourCompletion,
            min: minCompletion
        };
    }
    
    function updateBar($bar, completion) {
        $bar
            .find(".progress-bar")
            .css("width", completion + "%");
    }
    
    function update() {
        var completion = getCompletion();

        for (var key in completion) {
            if (completion.hasOwnProperty(key)) {
                var $bar = $progress.find(".progress-" + key);
                updateBar($bar, completion[key]);
            }
        }
        setTimeout(update, 200);
    }
    update();    

    // create day labels
    var now = new Date(),
        daysInMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    $(new Array(daysInMonth)).each(function(i) {
        var dayNum = daysInMonth - 1 - i;
        var $dayLabel = $("<i/>", {
            "class": "tick medium",
            text: dayNum + 1,
            css: {
                width: (1/daysInMonth)*100 + "%",
                left: (1/daysInMonth)*dayNum*100 + "%"
            }
        });
        $dayLabel.prependTo($progress.find(".progress-month .progress-bar"));
    }); 
    
    // create hour labels
    $(new Array(24)).each(function(i) {
        var hourNum = 23 - i;
        var $hourLabel = $("<i/>", {
            "class": "tick",
            text: hourNum === 12 || hourNum === 0
                ? "12"
                : hourNum < 12 ? hourNum+"am" : (hourNum-12)+"pm",
            css: {
                width: (1/24)*100 + "%",
                left: (1/24)*hourNum*100 + "%"
            }
        });
        $hourLabel.prependTo($progress.find(".progress-day .progress-bar"));
    }); 
    // create min labels
    $(new Array(60)).each(function(i) {
        var minNum = 59 - i;
        var $secLabel = $("<i/>", {
            "class": "tick small",
            text: minNum,
            css: {
                width: (1/60)*100 + "%",
                left: (1/60)*minNum*100 + "%"
            }
        });
        $secLabel.prependTo($progress.find(".progress-hour .progress-bar"));
    });    
    // create seconds labels
    $(new Array(60)).each(function(i) {
        var secNum = 59 - i;
        var $secLabel = $("<i/>", {
            "class": "tick small",
            text: secNum,
            css: {
                width: (1/60)*100 + "%",
                left: (1/60)*secNum*100 + "%"
            }
        });
        $secLabel.prependTo($progress.find(".progress-min .progress-bar"));
    }); 
    // create month labels
    $(new Array(12)).each(function(i) {
        var monthNum = 11 - i;
        var month = new Date(2000, monthNum, 1).toString("MMM");
        var $monthLabel = $("<i/>", {
            "class": "tick",
            text: month,
            css: {
                width: (1/12)*100 + "%",
                left: (1/12)*monthNum*100 + "%"
            }
        });
        $monthLabel.prependTo($progress.find(".progress-year .progress-bar"));
    });    
});