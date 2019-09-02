class PieChart {
    attribut;
    rates;

    constructor(attribut, rates) {
        this.attribut = attribut;
        this.rates = rates;

    }
}

class PieChartService {
    data;
    charts;

    constructor(data){
        this.data = data;
        this.charts = [];
    }

    getRecommendation() {
        var yesCount = 0;
        var count = 0;
        this.data.filter(function(row) {
            count += 1;
            if(row['recommendation'] == "Yes") {
                yesCount += 1;
            }
        })
        return Math.round(Helper.inProcent(count, yesCount));
    }

    getAverageGrade() {
        var gradesTotal = 0;
        var count = 0;
        this.data.filter(function(row) {
            gradesTotal += parseFloat(row['grade']);
            count += 1;
        })
        return gradesTotal/count;
    }

    getInfo(rowName) {
        var countYes = 0
        var countNo  = 0
        this.data.filter(function(row) {
            if (row[rowName] == 'Yes') {
                countYes += 1
            } else {
                countNo += 1
            }
        })
        return (countYes > countNo) ? "Yes" : "No"
    }

    getExamStyle() {
        var countOral = 0
        var countWritten  = 0
        var countPresentation = 0
        var countReport = 0
        this.data.filter(function(row) {
            switch(row["examStyle"]) {
                case "written":
                    countWritten += 1
                    break
                case "oral":
                    countOral += 1
                    break
                case "presentation":
                    countPresentation += 1
                    break
                case "report/scientific paper":
                    countReport += 1
                    break
            }
        })
        var counts = [ { Name: 'written',  Count: countWritten },
                       { Name: 'oral',  Count: countOral },
                       { Name: 'presentation', Count: countPresentation },
                       { Name: 'report/scientific paper', Count: countReport } ]
        var option = ''
        var max = 0
        for (var count of counts) {
            if (count.Count > max) {
                max = count.Count
                option = count.Name
            }
        }
        return option
    }

    getMaterials(){
        var materials = new Set()
        var material = ''
        this.data.filter(function(row) {
            for (var mat of row['materials'].split(',')) {
                material = ' ' + mat
                materials.add(material)
            }
        })
        return Array.from(materials).join();
    }

    getAmountOfRaters(){
        var count = 0
        this.data.filter(function(row) {
            count +=1
        })
        return ' ' + count
    }

    generatePieChart(chart, tooltipId = ""){
        var columns = [];
        for (var r of chart.rates) {
            columns.push([r.Name, r.Count])
        }
        if (tooltipId == "") {
            var selector = this.buildSelectorForDetailPage(chart)
        } else {
            var attribut = Helper.capitalizeFirstLetter(chart.attribut)
            var selector = ('#chart-' + tooltipId + attribut).replace(/ /g,'').replace(/,/g,'')
        }
        var chart = c3.generate({
            bindto: selector,
            data: {
                columns: 
                    columns
                ,
                type : 'pie'
            },
            legend: {
                 show: true
            },
            size: {
                width: 300,
                height: 300
            },
            label: {
               format: function (value, ratio, id) {
                  return d3.format('$')(value);
                }
          }
        });  

    }

    getOverallRate(attribut) {
        switch(attribut) {
            case "Pacing":
                return this.goodFairBadRate('pacing')
            case "Organization":
                return this.goodFairBadRate('organization')
            case "Previous Knowledge":
                return this.agreeNeutralDisagreeRate('previousKnowledge');
            case "Satisfaction":
                return this.agreeNeutralDisagreeRate('satisfaction');
            case "Satisfaction with the learned":
                return this.agreeNeutralDisagreeRate('satisfaction');
            case "Difficulty":
                return this.justRightLowHardRate('difficulty');
            case "Overall Quality":
               return this.goodFairBadRate('overallQuality')
            default:
                return '50';
        }
    }

    goodFairBadRate(rowName) {
        var countFair = 0;
        var countGood = 0;
        var countBad  = 0;
        var count     = 0;
        this.data.filter(function(row) {
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
        })
        var rates = [{Name: 'Good', Count: countGood}, {Name: 'Fair', Count: countFair}, {Name: 'Bad', Count: countBad}];
        var rate = (Helper.inProcent(count, countFair)*0.5 + Helper.inProcent(count, countBad)*-1 + Helper.inProcent(count, countGood));
        if (rate < 0) {
            rate = 0
        }
        this.charts.push(new PieChart(rowName, rates));
        return rate;

    }

    justRightLowHardRate(rowName) {
        var countJustRight = 0;
        var countHard = 0;
        var countLow  = 0;
        var count     = 0;
        this.data.filter(function(row) {
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
        })
        var rates = [{Name: 'low', Count: countLow}, {Name: 'just right', Count: countJustRight}, {Name: 'hard', Count: countHard}];
        var rate = (Helper.inProcent(count, countJustRight)*0.5 + Helper.inProcent(count, countLow)*-1 + Helper.inProcent(count, countHard));
        if (rate < 0) {
            rate = 0
        }
        this.charts.push(new PieChart(rowName, rates));
        return rate;
    }

    agreeNeutralDisagreeRate(rowName) {
            var countNeutral = 0;
            var countAgree = 0;
            var countDisagree  = 0;
            var count     = 0;
            this.data.filter(function(row) {
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
            }) 
            var rates = [{Name: 'Agree', Count: countAgree}, {Name: 'Neutral', Count: countNeutral}, {Name: 'Disagree', Count: countDisagree}];
            var rate = (Helper.inProcent(count, countNeutral)*0.5 + Helper.inProcent(count, countDisagree)*-1 + Helper.inProcent(count, countAgree));
            if (rate < 0) {
                rate = 0
            }
            this.charts.push(new PieChart(rowName, rates));
            return rate;
        }

    
        buildSelectorForDetailPage(chart){
            switch(chart.attribut){
                case "overallQuality":
                    return '#chart' + Helper.ucfirstLetter(chart.attribut);
                case "pacing":
                    return '#chart' + Helper.ucfirstLetter(chart.attribut);
                case "organization":
                    return'#chart' + Helper.ucfirstLetter(chart.attribut);
                case "previousKnowledge":
                    return'#chart' + Helper.ucfirstLetter(chart.attribut);
                case "difficulty":
                    return'#chart' + Helper.ucfirstLetter(chart.attribut);
                case "satisfaction":
                    return'#chart' + Helper.ucfirstLetter(chart.attribut);
            }

        }

}