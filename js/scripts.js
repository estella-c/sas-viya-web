// I referenced our in-class work with charts.js
// https://www.chartjs.org/docs/latest/samples/information.html
// https://www.w3schools.com/ai/ai_chartjs.asp
// ChatGPT for JS syntax and debugging

// Connect JS to Canvas in HTML doc
const chart1 = document.getElementById('chart1');
const chart2 = document.getElementById('chart2');
const chart3 = document.getElementById('chart3');
const chart4 = document.getElementById('chart4');

fetch('js/NC_Internet_Completed.json') // From json file
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(jsonData => {
// CHART 1
    const datasets = [];

    const concernData2 = jsonData.filter(item => item.onlineSecurityConcern1 == 1)
    .map(item => ({
        x: item.county,             
        y: item.Age
    }));

    // Referenced ChatGPT to help me learn how to create custom labels
    // Security labels
    const concernLabels = {
    onlineSecurityConcern1: 'Conducting Banking or Investing',
    onlineSecurityConcern2: 'Purchasing Goods or Services',
    onlineSecurityConcern3: 'Posting to Social Networks',
    onlineSecurityConcern4: 'Expressing Opinions',
    onlineSecurityConcern5: 'Using Search Engines'
    };

    // Concern labels
    const onlineConcernLabels = {
    onlineConcerns1: 'Identity Theft',
    onlineConcerns2: 'Credit or Bank Fraud',
    onlineConcerns3: 'Data Collection (Private)',
    onlineConcerns4: 'Data Collection (Government)',
    onlineConcerns5: 'Personal Data Online',
    onlineConcerns6: 'Harrassment'
    };

    // I referenced ChatGPT to help me with the syntax for mapping 3 variables together.
    // Mapping Security labels to the x and y
    for (let i = 1; i <= 5; i++) {
    const concernKey = `onlineSecurityConcern${i}`;
    console.log('Security Concern Key:', concernKey);

    const concernData = jsonData.filter(item => Number(item[concernKey]) === 1)
        .map(item => ({
            x: item.county,
            y: item.Age 
        }));

    if (concernData.length > 0) {
    datasets.push({
        label: concernLabels[concernKey],
        data: concernData,  // Include only items with "1" for this concern
        backgroundColor: `rgba(${i * 40}, ${i * 50}, 255, 0.6)`, // Referenced ChatGPT to generate more than Chart.js' 6 colors
        borderColor: `rgba(${i * 40}, ${i * 50}, 255, 1)`,
        borderWidth: 1
    });
    } else {
    console.log(`No data for ${concernLabels[concernKey]}`);
    }
    }

    // Mapping Concern labels to the x and y
    for (let i = 1; i <= 6; i++) {
    const concernKey = `onlineConcerns${i}`;
    console.log('Online Concern Key:', concernKey);

    const concernData = jsonData.filter(item => Number(item[concernKey]) === 1)
    .map(item => ({
        x: item.county,
        y: item.Age 
    }));

    //console.log(`Online Concern ${i} data:`, concernData);

    if (concernData.length > 0) {
    const concernLabel = onlineConcernLabels[concernKey];
    datasets.push({
        label: concernLabel,
        data: concernData,
        backgroundColor: `rgba(${i * 50}, ${i * 30}, 150, 0.6)`, // Referenced ChatGPT to generate more than Chart.js' 6 colors
        borderColor: `rgba(${i * 50}, ${i * 30}, 150, 1)`,
        borderWidth: 1
    });
    } else {
    console.log(`No data for Online Concern ${i}`);
    }
    }

    // From Chart.js, modified to enable custom labels and 3 variables
    new Chart(chart1, {
    type: 'scatter',
    data: {
    datasets: datasets
    },
    options: {
        responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Respondants are concerned about the following online'
        },
        legend: {
            position: 'top',
        },
    },
    tooltip: {
        callbacks: {
        // Referenced ChatGPT to implement custom labels
        label: function(tooltipItem) {
            const dataset = tooltipItem.dataset;
            const label = dataset.label || 'Concern';
            return `${label}: (${tooltipItem.raw.x}, ${tooltipItem.raw.y})`;
        }
        }
    },
    scales: {
        x: {
            type: 'linear',
            position: 'bottom',
            title: {
                display: true,
                text: 'County'
            },
            ticks: {
                stepSize: 1,
            }
        },
        y: {
            type: 'linear',
            position: 'left',
            title: {
                display: true,
                text: 'Age'
            }
        }
    }
    }
    });

// CHART 2
    // Creating the income and device groups, referenced chatGPT for syntax
    const incomeGroups = jsonData.reduce((acc, item) => {
    if (!acc[item.familyIncome]) {
        acc[item.familyIncome] = [];
    }
    acc[item.familyIncome].push(item);
    return acc;
    }, {});

    const countOnesByIncome = Object.keys(incomeGroups).map(familyIncome => {
    const group = incomeGroups[familyIncome];

    const countLaptopOnes = group.filter(item => item.laptopUsage === 1).length;
    const countDesktopOnes = group.filter(item => item.desktopUsage === 1).length;
    const countTabletOnes = group.filter(item => item.tabletUsage === 1).length;
    const countWatchOnes = group.filter(item => item.smartWatch === 1).length;
    const countTVOnes = group.filter(item => item.smartTV === 1).length;
    const countPhoneOnes = group.filter(item => item.phoneDataPlan === 1).length;

    return {
        familyIncome: familyIncome,
        countLaptopOnes: countLaptopOnes,
        countDesktopOnes: countDesktopOnes,
        countTabletOnes: countTabletOnes,
        countWatchOnes: countWatchOnes,
        countTVOnes: countTVOnes,
        countPhoneOnes: countPhoneOnes
    };
    });

    const incomeRangeMap = {
    1: '$0 - 5000',
    2: '$5000 - 7000',
    3: '$7,500 TO 9,999',
    4: '$10,000 TO 12,499',
    5: '$12,500 TO 14,999',
    6: '$15,000 TO 19,999',
    7: '$20,000 TO 24,999',
    8: '$25,000 TO 29,999',
    9: '$30,000 TO 34,999',
    10: '$35,000 TO 39,999',
    11: '$40,000 TO 49,999',
    12: '$50,000 TO 59,999',
    13: '$60,000 TO 74,999',
    14: '$75,000 TO 99,999',
    15: '$100,000 TO 149,999',
    16: '$150,000 OR MORE'
    };

    const labels = countOnesByIncome.map(item => {
    const incomeRange = incomeRangeMap[item.familyIncome];
    return incomeRange || `Income Group ${item.familyIncome}`;
    });

    const laptopData = countOnesByIncome.map(item => item.countLaptopOnes);
    const desktopData = countOnesByIncome.map(item => item.countDesktopOnes);
    const tabletData = countOnesByIncome.map(item => item.countTabletOnes);
    const watchData = countOnesByIncome.map(item => item.countWatchOnes);
    const tvData = countOnesByIncome.map(item => item.countTVOnes);
    const phoneData = countOnesByIncome.map(item => item.countPhoneOnes);

    // From Chart.js, modified to enable custom labels and 3 variables
    new Chart(chart2, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'Phone Usage',
                data: phoneData,
                borderWidth: 1
            },
            {
                label: 'Laptop Usage',
                data: laptopData,
                borderWidth: 1
            },
            {
                label: 'Desktop Usage',
                data: desktopData,
                borderWidth: 1
            },
            {
                label: 'Tablet Usage',
                data: tabletData,
                borderWidth: 1
            },
            {
                label: 'Smart Watch Usage',
                data: watchData,
                borderWidth: 1
            },
            {
                label: 'Smart TV Usage',
                data: tvData,
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
            display: true,
            text: 'Internet access by device per family income'
            },
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Family Income per Year'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Num Responses'
                },
                beginAtZero: true,
                ticks: {
                    min: 0
                }
            }
        }
    }
    });

// CHART 3
    // Pulling data from columns
    const targetColumns = [
    "emailOnline", 
    "textingMessagingOnline", 
    "socialMediaOnline", 
    "gamingOnline",
    "conferencesCallOnline",
    "watchVideoOnline",
    "listenAudioOnline",
    "contentCreationOnline",
    "workFromHome",
    "jobSearchOnline",
    "jobTrainingOnline",
    "governmentServicesOnline",
    "requestingServicesOnline",
    "sellingServicesOnline",
    "shoppingOnline",
    "sellingItemsOnline",
    "paymentBankingOnline",
    "digitalVoiceAssistantOnline",
    "iotOnline",
    "healthRecordsOnline",
    "healthCommunicationOnline",
    "healthResearchOnline",
    "electronicHealthMonitoringOnline"
    ];

    // Referenced ChatGPT for syntax of counting all Yes/No responses and converting them to percentages
    const categoryCounts = targetColumns.reduce((acc, category) => {
    acc[category] = { yes: 0, no: 0 };
    jsonData.forEach(item => {
    if (item[category] === 1) {
        acc[category].yes += 1;
    } else if (item[category] === 2) {
        acc[category].no += 1;
    }
    });
    return acc;
    }, {});

    const categories = Object.keys(categoryCounts);
    const yesPercentages = categories.map(category => {
    const yes = categoryCounts[category].yes;
    const total = yes + categoryCounts[category].no;
    return total > 0 ? (yes / total) * 100 : 0;
    });

    const noPercentages = categories.map(category => {
    const no = categoryCounts[category].no;
    const total = no + categoryCounts[category].yes;
    return total > 0 ? (no / total) * 100 : 0;
    });

    // From Chart.js, modified
    new Chart(chart3, {
    type: 'bar',
    data: {
    labels: categories,
    datasets: [{
        label: 'Yes',
        data: yesPercentages
    },
    {
        label: 'No',
        data: noPercentages
    }]
    },
    options: {
    indexAxis: 'y', 
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'How people are spending their time on the internet'
        }
    },
    interaction: {
        intersect: false
    },
    scales: {
        x: {
            stacked: true,
            title: {
                display: true,
                text: 'Percentage of Total Responses'
            },
            ticks: {
                beginAtZero: true,
                max: 100 
            }
        },
        y: {
            stacked: true,
            type: 'category',
            ticks: {
                autoSkip: false,
            },
            title: {
                display: true,
                text: 'Categories'
            },
            grid: {
                display: false
            }
        }
    }
    }
    });

// CHART 4

    // Pulling data from columns
    const internetUsageColumns = [
        "internetUsageLocationWork",
        "internetUsageLocationSchool",
        "internetUsageLocationCafe",
        "internetUsageLocationTravel",
        "internetUsageLocationPublic",
        "internetUsageLocationHomeOther",
        "internetUsageLocationOther"
    ];

    // Modified from chart3
    const categoryCounts2 = internetUsageColumns.reduce((acc, category) => {
        acc[category] = { yes: 0, no: 0 };
        jsonData.forEach(item => {
            if (item[category] === 1) {
                acc[category].yes += 1;
            } else if (item[category] === 2) {
                acc[category].no += 1;
            }
        });
        return acc;
    }, {}); 

    const categories2 = Object.keys(categoryCounts2);
    const yes2 = categories2.map(category => categoryCounts2[category].yes);
    const no2 = categories2.map(category => categoryCounts2[category].no);

    // From Chart.js, modified
    new Chart(chart4, {
        type: 'bar',
        data: {
            labels: categories2,
            datasets: [{
                        label: 'Yes',
                        data: yes2,
                        borderWidth: 1
                    },
                    {
                        label: 'No',
                        data: no2,
                        borderWidth: 1
                    }
                ]
        },
        options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Internet Usage Locations'
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Location'
                            },
                            beginAtZero: true
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Frequency' 
                            },
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1 
                    }
                }
            }
        }
    });

})
.catch(error => console.error('Error loading the JSON data:', error));