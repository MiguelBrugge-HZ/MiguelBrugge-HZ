const table = document.getElementById('dashboard-table');
const totalCredits = document.getElementById('total-credits');

let amountOfCredits = 0;

const baseUrl = window.location.pathname.split('/').slice(0, -1).join('/');
let response = await fetch(`${baseUrl}/data/courses.json`);
let json = await response.json();
let courses = json.courses;

// loop through courses
// course has asignments?
//     add assignment
//     -- tbc
courses.forEach(course => {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    // Loop through each attribute
    for (const prop in course) {
        if (prop == "assessments") {
            course["assessments"].forEach(assessment => {
                const tr = document.createElement('tr');
                table.appendChild(tr);
                for (const prop in assessment) {
                    const td = document.createElement('td');
                    td.innerText = assessment[prop];
                    tr.appendChild(td);

                    // Count total amount of credits
                    if ((course['grade'] > 5.5 || course['status'] == "Completed") && prop == "ec") {
                        amountOfCredits += course[prop];
                    }
                    if (prop != "status") {
                        continue;
                    }
                    td.classList.add("status");
                    // Completed
                    if (course['grade'] > 5.5) {
                        td.innerText = "Completed";
                        td.classList.add("status-completed");
                        // Failed
                    } else if (course['grade'] < 5.5 && course['grade'] != 0) {
                        td.innerText = "Failed";
                        td.classList.add("status-failed");
                    } else {
                        // No grade
                        switch (course[prop]) {
                            case "Not Started":
                                td.classList.add("status-not-started");
                                break;
                            case "Failed":
                                td.classList.add("status-failed");
                                break;
                            case "Completed":
                                td.classList.add("status-completed");
                                break;
                            default:
                                td.innerText = "Unknown";
                                td.classList.add("status-unknown");
                                break;
                        }
                    }
                }
            });
            continue;
        }
        const td = document.createElement('td');
        td.innerText = course[prop];
        // if(course["assessments"] && prop == "name"){
        //     td.rowSpan = course["assessments"].length;
        // }
        tr.appendChild(td);

        // Count total amount of credits
        if ((course['grade'] > 5.5 || course['status'] == "Completed") && prop == "ec") {
            amountOfCredits += course[prop];
        }
        if (prop != "status") {
            continue;
        }
        td.classList.add("status");
        // Completed
        if (course['grade'] > 5.5) {
            td.innerText = "Completed";
            td.classList.add("status-completed");
            // Failed
        } else if (course['grade'] < 5.5 && course['grade'] != 0) {
            td.innerText = "Failed";
            td.classList.add("status-failed");
        } else {
            // No grade
            switch (course[prop]) {
                case "Not Started":
                    td.classList.add("status-not-started");
                    break;
                case "Failed":
                    td.classList.add("status-failed");
                    break;
                case "Completed":
                    td.classList.add("status-completed");
                    break;
                default:
                    td.innerText = "Unknown";
                    td.classList.add("status-unknown");
                    break;
            }
        }
    }
});
totalCredits.innerText = amountOfCredits;