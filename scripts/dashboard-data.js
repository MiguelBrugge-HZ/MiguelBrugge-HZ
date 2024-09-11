/*
In this code I generate each row and column for the dashboard.
To do this I have a courses.json file set up with all the courses and their data.
This allows me to quickly change the data with the table dynamically to the made changes.

Functionalities:
- Sum of all obtained EC's
- Change the course's status based on grades
*/

const table = document.getElementById('dashboard-table');
const totalCreditsElement = document.getElementById('total-credits');

let sumOfCredits = 0;

const baseUrl = window.location.pathname.split('/').slice(0, -1).join('/');
let response = await fetch(`${baseUrl}/data/courses.json`);
let json = await response.json();
let courses = json.courses;

function addRow(object, isCourse){
    const tr = document.createElement('tr');
    table.appendChild(tr);
    for(const property in object){
        if(property == "assessments"){
            // Loop through each assesment to add row for each one
            for(const assignment of object["assessments"]){
                addRow(assignment, false)
            }
            continue;
        }

        const td = document.createElement('td');
        td.innerText = object[property];
        tr.appendChild(td);

        // Sum up the grades
        if(property == "grade" && object[property] && object['grade'] > 5.5){
            sumOfCredits += object["ec"];
        }

        if(!isCourse){continue;}

        if(property == "status"){
            td.classList.add("status");
            let isCompleted = true;
            let isGraded = false;
            // Check if a course with assessement is completed and if it's partly graded
            if(object["assessments"]){
                for(const assesment of object["assessments"]){
                    if (assesment['grade'] < 5.5 && assesment['grade']) {
                        isCompleted = false;
                    }
                    if(assesment['grade']){
                        isGraded = true;
                    }
                }
            }
            // If only one assessment is positivally graded change status of the course
            if(isGraded){
                td.innerText = "Ongoing";
                td.classList.add("status-unknown");
            }
            if (object['grade'] > 5.5) {
                td.innerText = "Completed";
                td.classList.add("status-completed");
                td.classList.remove("status-unknown");
            // Failed
            } else if (object['grade'] < 5.5 && object['grade'] || !isCompleted) {
                td.innerText = "Failed";
                td.classList.add("status-failed");
                td.classList.remove("status-unknown");
            }

            // If state is set
            switch (object[property]) {
                case "Not Started":
                    td.classList.add("status-not-started");
                    break;
                case "Failed":
                    td.classList.add("status-failed");
                    break;
                case "Completed":
                    td.classList.add("status-completed");
                    // Add total amount of ec's from the course
                    if(object["assessments"]){
                        for(const assesment of object["assessments"]){
                            sumOfCredits += assesment["ec"];
                        }
                    }else{
                        sumOfCredits += object["ec"];
                    }
                    break;
                default:
                    td.innerText = "Unknown";
                    td.classList.add("status-unknown");
                    break;
            }
        }
    }
}

for(const course of courses){
    addRow(course, true);
}

totalCreditsElement.innerText = sumOfCredits;
