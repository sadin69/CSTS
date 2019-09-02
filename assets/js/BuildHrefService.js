class BuildHrefService {

    static buildHrefFromSelectionComparison() {
        var coursesToCompare = []
        for (var elem of $('.dropdown--select-course-to-compare')) {
            if (elem.value) {
                coursesToCompare.push(elem.value)
            }
        }

        if (coursesToCompare.length > 2) {
            localStorage.setItem("filters", "");
            return "comparison_page.html?studyprogram=" + studyprogram + "&targetdegree=" + targetdegree + "&course1=" + coursesToCompare[0] + "&course2=" + coursesToCompare[1] + "&course3=" + coursesToCompare[2];
        } else if (coursesToCompare.length == 2) {
            localStorage.setItem("filters", "");
            return "comparison_page.html?studyprogram=" + studyprogram + "&targetdegree=" + targetdegree + "&course1=" + coursesToCompare[0] + "&course2=" + coursesToCompare[1];
        } else {
            alert('You need to pick at least 2 courses to compare!');
            return "#"
        }
    }
    
    static buildHrefFromChart(att, option = 'show-more') {
        var attribut = att.getSelected();

        if (option === 'overview') {
            return "overview_page.html?studyprogram=" + studyprogram + "&targetdegree=" + targetdegree + "&attribut=" + attribut;
        } else {
            return "show_more_page.html?studyprogram=" + studyprogram + "&targetdegree=" + targetdegree + "&attribut=" + attribut;
        }
        //tbd show the same attribut when going back to overview
    }

    static buildHrefFromSelection() {
        var course = $('.dropdown--select-course-details').val();
        if (course) {
            localStorage.setItem("filters", "");

            return "detail_page.html?studyprogram=" + studyprogram + "&targetdegree=" + targetdegree + "&course=" + course;
        } else {
            alert('You need to pick a Course!');
            return "#"
        }
        
    }

    static buildHrefToIndex() {
        localStorage.setItem("filters", "");
        
        return "index.html"
    }

    static buildHrefFromSelectionIndex() {
        var studyprogram = $('.dropdown--study-program').val();
        var targetDegree = $('.dropdown--target-degree').val();

        return "overview_page.html?studyprogram=" + studyprogram + "&targetdegree=" + targetDegree + "&attribut=null";
    }

    static buildHrefToOverview(){
        localStorage.setItem("filters", "");
        return "overview_page.html?studyprogram=" + studyprogram + "&targetdegree=" + targetdegree;
    }
}