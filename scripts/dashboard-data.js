const table = document.getElementById('dashboard-table');
const totalCredits = document.getElementById('total-credits');

let amountOfCredits = 0;

let response = await fetch('./data/courses.json');
let json = await response.json();
let courses = json.courses;

courses.forEach(course => {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    for (const prop in course) {
        const td = document.createElement('td');
        td.innerText = course[prop];
        tr.appendChild(td);
        if(prop == "ec" && course['grade'] > 5.5){
            amountOfCredits += course[prop];
        }
        if (prop != "status") {
            continue;
        }
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