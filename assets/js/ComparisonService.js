class ComparisonService {
    averageGrades;
    pacingRates;
    organizationRates;
    previousKnowledgeRates;
    difficultyRates;
    recomendationRates;
    averageGrades;
    satisfactionRates;
    overallQualityRates;
    winners;

    constructor() {
        this.averageGrades = [];
        this.pacingRates = [];
        this.organizationRates = [];
        this.previousKnowledgeRates = [];
        this.difficultyRates = [];
        this.recomendationRates = [];
        this.averageGrades = [];
        this.satisfactionRates = [];
        this.overallQualityRates = [];
        this.winners = []
    }

    addToRatesArray(rate, att, chart) {
        var course = chart.data[0].coursename
        switch(att) {
            case "Pacing":
                this.pacingRates.push({Course: course, Value: rate});
                break;
            case "Organization":
                this.organizationRates.push({Course: course, Value: rate})
                break;
            case "Previous Knowledge":
                this.previousKnowledgeRates.push({Course: course, Value: rate})
                break;
            case "Satisfaction":
                this.satisfactionRates.push({Course: course, Value: rate})     
                break;     
            case "Difficulty":
               this.difficultyRates.push({Course: course, Value: rate})
               break;
            case "Overall Quality":
                this.overallQualityRates.push({Course: course, Value: rate})
                break;
            case "Average Grade":
                this.averageGrades.push({Course: course, Value: rate})
                break;
            case "Recommendation":
                this.recomendationRates.push({Course: course, Value: rate})  
                break;
        }

    }

    findAllWinners(sortedArray) {
        var winners = []
        for (var r of sortedArray) {
            if(r.Value == sortedArray[0].Value){
                winners.push(r.Value);
                this.winners.push(r.Course)
            }
        }
        return winners
    }

    paintCellGreen(winnerValue, noPerc = false){
        var val = ''
        if (noPerc) {
            val = winnerValue
        } else {
            val = winnerValue + '%'
        }
        $('#attributTable tr:last-of-type').children().each(function (i, e) {
            if (e.getElementsByTagName('div')[0].innerHTML == val) {
                e.style.backgroundColor = 'rgb(0, 153, 0, 0.2)'
            }
        })
    }

    defineWinners(att){
        var winners = []
        switch(att) {
            case "Pacing":
                winners = this.findAllWinners(this.pacingRates.sort(Helper.sortForChart('Value')));
                this.paintCellGreen(winners[0])
                break;
            case "Organization":
                winners = this.findAllWinners(this.organizationRates.sort(Helper.sortForChart('Value')))
                this.paintCellGreen(winners[0])
                break;
            case "Previous Knowledge":
                winners = this.findAllWinners(this.previousKnowledgeRates.sort(Helper.sortForChart('Value')))
                this.paintCellGreen(winners[0])
                break;
            case "Satisfaction":
                winners = this.findAllWinners(this.satisfactionRates.sort(Helper.sortForChart('Value')))
                this.paintCellGreen(winners[0])
                break;           
            case "Difficulty":
               winners = this.findAllWinners(this.difficultyRates.sort(Helper.sortForChart('Value', 'asc')))
               this.paintCellGreen(winners[0])
                break;       
            case "Overall Quality":
                winners = this.findAllWinners(this.overallQualityRates.sort(Helper.sortForChart('Value')))
                this.paintCellGreen(winners[0])
                break;
            case "Average Grade":
                winners = this.findAllWinners(this.averageGrades.sort(Helper.sortForChart('Value', 'asc')))
                this.paintCellGreen(winners[0], true)
                break;       
            case "Recommendation":
                winners = this.findAllWinners(this.recomendationRates.sort(Helper.sortForChart('Value')))
                this.paintCellGreen(winners[0])
                break; 
        }
    }

    defineOverallWinner() {
        var overallWinner = []
        var countObject = Helper.countOccurences(this.winners);
        countObject.sort(Helper.sortForChart('Count'));
        for (var o of countObject) {
            if (o.Count == countObject[0].Count) {
                overallWinner.push(o.Course)
            }
        }
        return overallWinner
    }

}