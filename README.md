# Course Selection Support & Teaching Strategy [CSTS] by G3D3
This simple system was created to help students of the University of Duisburg-Essen find and compare courses of their study program. Students are able to view other students reviews of courses retrieved from a survey that was carried out through May and June of 2019. Therefore the data basis is not exhaustive let alone very huge, but shows the systems potential and is easily expandable.
Based on the assessed data users are able to pick their specific study program and view ratings of corresponding courses on specfic attributs like diffculty, pacing, etc. as well as the average grade or general recommendation. Users are also able to filter for courses based on their exam style, availablity of excercises or bonus points. Users are provided a Top 3 as well as a "show all" ranking of the reviewd courses in their program. Users are also able to inspect courses in detail or compare 2-3 courses of interest directly to each other. Additionally teachers are also able to .....

## Project Architecture
    .
    ├── assets                  
        ├── css                 # css files
             ├── libraries      # css files from outside sources
              └── ...           # css files 
        ├── csv                 # data as csv 
        ├── images              # images e.g. logo
        └── js                  # js files
           ├── libraries        # js files from outside sources
           └── ...              # js files
    ├── comparison_page.html                    
    ├── detail_page.html          
    ├── overview_page.html
    ├── index.html
    ├── show_more_page.html
    └── README.md

Generally this project is a very simple application based only on html, css, js/jquery. 
Specific libraries that were used are:
* bootstrap
* font-awesome
* c3
* d3
* jquery
* popper

All libraries were downloaded and are hosted by ourselves. 

The project basically consists of five html pages which use services contained in the js folder. There are five services and one helper class containing basic methods that are used all over the application.
The five services are:
* **BarChartService**   --> Responsible for generating c3 - bar charts
* **PieChartService**   --> Responsible for generating c3 - pie charts
* **BuildHrefService**  --> Contains Methods building hrefs for linkage between the views
* **DropdownService**   --> Responsible for filling dropdowns with content
* **ComparisonService** --> Only used in comparison page, holds methods to compare courses

Data is stored and loaded from prod.csv. The csv file consists of 15 fields displaying only some of the collected data from the survey (see description above). The test.csv is/was used for development purposes only.

### Visualizations
The projects main purpose was the visualization of data. In accord with the What-Why-How Framework presented by Tamara Munzner (2015), the collected data only suited very basic graph types like pie and bar charts. Simple tables were used for comparison.

**1) Bar Chart: Top 3 Courses**

![Bar chart screenshot](https://github.com/Lullu08/Lullu08.github.io/blob/master/assets/images/bar_chart_small.png)



**2) Bar Chart: All courses**

![Bar chart big screenshot](https://github.com/Lullu08/Lullu08.github.io/blob/master/assets/images/bar_chart_big.png)



**3) Pie Chart: Course details**

![Pie chart one screenshot](https://github.com/Lullu08/Lullu08.github.io/blob/master/assets/images/pie_chart1.png)



**4) Pie Chart: Details of Value on Comparison Page**

![Pie chart two screenshot](https://github.com/Lullu08/Lullu08.github.io/blob/master/assets/images/pie_chart2.png)



**5) Comparsion Table**

![Comparison table screenshot](https://github.com/Lullu08/Lullu08.github.io/blob/master/assets/images/comparison_table.png)

## Run the project
The most easiest way to run this project locally you only need to clone this repository and run *http-server* the corresponding folder on your command line. For this to work you have to have [npm/Node.js](https://www.npmjs.com/get-npm) and the [http-server package](https://www.npmjs.com/package/http-server) installed. The project should then be running on [http://localhost:8080](http://localhost:8080).

## Deployment
With every change the master branch of this repository is deployed to [https://lullu08.github.io/](https://lullu08.github.io/). There are no special requirements for the deployment of this project to any other destination hosted somewhere else. 

### Contributors
* Luisa Bräuer 
* Moloud
* ABM Rocknuzzaman
