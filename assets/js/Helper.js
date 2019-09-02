class Helper {

    static getAttributs() {
        var attributs = ['Pacing', 'Organization', 'Previous Knowledge', 'Difficulty', 'Recommendation', 'Average Grade', 'Satisfaction with the learned', 'Overall Quality' ]
        return attributs
    }

    static capitalizeFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    static countOccurences(arr) {
        var a = [], b = [], prev, result = [];
        
        arr.sort();
        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[i] !== prev ) {
                a.push(arr[i]);
                b.push(1);
            } else {
                b[b.length-1]++;
            }
            prev = arr[i];
        }
        for ( var i = 0; i < a.length; i++ ) {
            result.push({Course: a[i], Count: b[i]})
        }

        return result;
    }

    static generateDropdowns(amountOfcourses) {
        var dropdown = '<select class="dropdown--select-course-to-compare"><option value="" disabled selected>Select Course</option></select>';
        var submitButton = '<div class="sidebar__btn-course-detail"><button type="button" class="btn btn-course-detail" onclick="location.href=BuildHrefService.buildHrefFromSelectionComparison()">Compare Courses!</button></div>';
        var sidebar = $('.sidebar__compare-courses');
        if (amountOfcourses >= 3) {
            sidebar.html(dropdown + dropdown + dropdown + submitButton)
        } else if (amountOfcourses == 2) {
            sidebar.html(dropdown + dropdown + submitButton)
        } else {
            sidebar.html('<p class="compare-info">There are not enough courses reviewed in this Study Program!</p><div class="sidebar__btn-compare-courses"><button type="button" class="btn btn-compare-courses" onclick="location.href=bla()" disabled>Compare Courses!</button></div>')
        }
    }

    static ucfirstLetter(string) 
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static  getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    }

    static getFiltersFromString(String){
        return String.split(",");
     }

    static checkForFilters() {
        var filters = []
        var inputs = document.getElementsByTagName('input')
        for (var i of inputs) {
            if(i.checked && !(i.value == 'whatever')) {
                filters.push(i.value)
            }
        }
        return filters;
    }

    static checkInputs(filters) {
        for (var f of filters) {
            var inputs = document.getElementsByTagName('input')
            for (var i of inputs) {
                if(i.value == f) {
                    i.checked = true
                }
            }
        }
    }

    static inProcent(total, part){
        return (part/total)*100;
    }
    
    static sortForChart(property, order = 'desc'){
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        switch(order) {
            case 'asc':
                return function (b,a) {
                    var result = (a[property] > b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                    return result * sortOrder;
                }
            default:
                return function (a,b) {
                    var result = (a[property] > b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                    return result * sortOrder;
                }
        }
       
    }
}