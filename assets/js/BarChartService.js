class BarChartService {
    data;
    selector;
    courses;
    showAll;
    filterapplied;
    
    constructor(data, selector, courses, showAll = true) {
        this.data = data
        this.selector = selector
        this.courses = courses
        this.showAll = showAll
    }


    getColumns(columns, sortedArray) {
        var temp = sortedArray.map(a => a.Value);
        for (var i of temp) {
            columns.push(i);
        }
        if (!this.showAll && columns.length > 4) {
            return columns.slice(0,4);
        } else {
            return columns;
        }
    }

    getCategories(sortedArray) {
        var categories = sortedArray.map(a => a.Course);
        if (!this.showAll && categories.length > 3) {
            return categories.slice(0,3);
        } else {
            return categories;
        }
    }

    getCourses() {
        var courses = new Set();
        this.data.filter(function(row) { 
            courses.add(row["coursename"])
            })
        return Array.from(courses);
    }

    applyFilter(filters) {
        var filterObjects = []
        for (var filter of filters) {
            switch(filter){
                case "excercises":
                    filterObjects.push({Row: "additionalExcercises", Value: "Yes"})
                    break;
                case "bonus points":
                    filterObjects.push({Row: "bonusPoints", Value: "Yes"})
                    break;
                case "oral":
                    filterObjects.push({Row: "examStyle", Value: filter})
                    break;
                case "written":
                    filterObjects.push({Row: "examStyle", Value: filter})
                    break;
                case "presentation":
                    filterObjects.push({Row: "examStyle", Value: filter})
                    break;
                case "report/scientific paper":
                    filterObjects.push({Row: "examStyle", Value: filter})
                    break;
                default:
                    return;
            }
        }
        return this.filterData(filterObjects, this.data, filterObjects.length)
    }

    filterData(filters, data, count) {
        if(count > 0) {
            var filteredData = data.filter(function(row) {
                if(row[filters[count-1].Row] == filters[count-1].Value) {
                    return row;
                }
            })
            count -= 1;
            return this.filterData(filters, filteredData, count)
        } else {
            return data;
        }
    }

    generateBarChart(attribut, filters = []) {
        if (filters.length > 0) { 
            this.data = this.applyFilter(filters);
            this.courses = this.getCourses();
        }
        var columns;
        var chartData = [];
        switch(attribut) {
            case "Average Grade":
                columns = [attribut];
                for (let item of this.courses) {
                    var gradesTotal = 0;
                    var count = 0;
                    this.data.filter(function(row) {
                        if(row["coursename"] == item) {
                            gradesTotal += parseFloat(row['grade']);
                            count += 1;
                        }
                    })
                    var averageGrade = gradesTotal/count;
                    chartData.push({Course: item, Value: averageGrade});
                }
                chartData.sort(Helper.sortForChart("Value", 'asc'));
                break;
            case "Recommendation":
                columns = ['Recommendation in %'];
                for (let item of this.courses) {
                    var yesCount = 0;
                    var count = 0;
                    this.data.filter(function(row) {
                        if(row["coursename"] == item) {
                            count += 1;
                            if(row['recommendation'] == "Yes") {
                                yesCount += 1;
                            }
                        }
                    })
                    var recommRate = Helper.inProcent(count, yesCount);
                    chartData.push({Course: item, Value: recommRate});
                }
                chartData.sort(Helper.sortForChart("Value"));
                break;
            case "Pacing":
                columns = ['Satisfaction with Pacing in %'];
                chartData = this.goodFairBadRate('pacing');
                break;
            case "Organization":
                columns = ['Satisfaction with Organization in %'];
                chartData = this.goodFairBadRate('organization');
                break;
            case "Difficulty":
                columns = ['Difficulty in %']
                chartData = this.justRightLowHardRate( 'difficulty');
                break;
            case "Previous Knowledge":
                columns = ['Previous Knowledge required in %']
                chartData = this.agreeNeutralDisagreeRate('previousKnowledge');
                break;
            case "Satisfaction with the learned":
                columns = ['Satisfaction with the learned in %']
                chartData = this.agreeNeutralDisagreeRate('satisfaction');
                break;
            case "Overall Quality":
                columns = ['Satisfaction with Overall Quality in %']
                chartData = this.goodFairBadRate('overallQuality');
                break;
            default: 
                break;      
        }
        var columns = this.getColumns(columns, chartData)

        var chart = c3.generate({
            bindto: this.selector,
            padding: {
                bottom: 30
            },
            data: {
              columns: [
                columns
              ],
              type: 'bar',
              colors: {
                'Average Grade': 'rgb(255,133,51, 0.8)',
                'Recommendation in %': 'rgb(34,139,34, 0.8)',
                'Satisfaction with Pacing in %': 'rgb(0, 0, 102, 0.8)',
                'Satisfaction with Organization in %': 'rgb(220,20,60, 0.8)',
                'Difficulty in %': 'rgb(102, 0, 102, 0.8)',
                'Previous Knowledge required in %': 'rgb(0, 102, 102, 0.8)',
                'Satisfaction with the learned in %': 'rgb(100,149,237, 0.8)',
                'Satisfaction with Overall Quality in %':'rgb(240,230,140)'
              }
            },
            axis: {
              x: {
                type: 'category',
                categories: this.getCategories(chartData),
                tick: {
                  centered: true
                }
              },
              y: {
                label: {
                  text: columns[0],
                  position: 'outer-middle'
                },
                padding: {
                  top: 0,
                  bottom: 0
                }
              }
            },
            legend: {
              show: false
            }
        });
    }

    justRightLowHardRate(rowName) {
        var chartData = [];
        for (let item of this.courses) {
            var countJustRight = 0;
            var countHard = 0;
            var countLow  = 0;
            var count     = 0;
            this.data.filter(function(row) {
                if(row["coursename"] == item) {
                    count += 1;
                    switch(row[rowName]) {
                    case "just right":
                        countJustRight +=1;
                        break;
                    case "hard":
                        countHard +=1;
                        break;
                    case "low":
                        countLow+=1;
                        break;
                    }
                }
            }) 
            var rate = (Helper.inProcent(count, countJustRight)*0.5 + Helper.inProcent(count, countLow)*-1 + Helper.inProcent(count, countHard));
            if (rate < 0) {
                rate = 0
            }
            chartData.push({Course: item, Value: rate});
        }
        return chartData.sort(Helper.sortForChart("Value"));
    }

    goodFairBadRate(rowName) {
        var chartData = [];
        for (let item of this.courses) {
            var countFair = 0;
            var countGood = 0;
            var countBad  = 0;
            var count     = 0;
            this.data.filter(function(row) {
                if(row["coursename"] == item) {
                    count += 1;
                    switch(row[rowName]) {
                    case "Fair":
                        countFair +=1;
                        break;
                    case "Bad":
                        countBad +=1;
                        break;
                    case "Good":
                        countGood+=1;
                        break;
                    }
                }
            }) 
            var rate = (Helper.inProcent(count, countFair)*0.5 + Helper.inProcent(count, countBad)*-1 + Helper.inProcent(count, countGood));
            if (rate < 0) {
                rate = 0
            }
            chartData.push({Course: item, Value: rate});
        }
        return chartData.sort(Helper.sortForChart("Value"));
    }

    agreeNeutralDisagreeRate(rowName) {
        var chartData = [];
        for (let item of this.courses) {
            var countNeutral = 0;
            var countAgree = 0;
            var countDisagree  = 0;
            var count     = 0;
            this.data.filter(function(row) {
                if(row["coursename"] == item) {
                    count += 1;
                    switch(row[rowName]) {
                    case "Neutral":
                        countNeutral +=1;
                        break;
                    case "Disagree":
                        countDisagree +=1;
                        break;
                    case "Agree":
                        countAgree+=1;
                        break;
                    }
                }
            }) 
            var rate = (Helper.inProcent(count, countNeutral)*0.5 + Helper.inProcent(count, countDisagree)*-1 + Helper.inProcent(count, countAgree));
            if (rate < 0) {
                rate = 0
            }
            chartData.push({Course: item, Value: rate});
        }
        return chartData.sort(Helper.sortForChart("Value"));
    }

}