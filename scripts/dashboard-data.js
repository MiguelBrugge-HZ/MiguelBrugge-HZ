/**
    In this code I generate each row and column for the dashboard.
    To do this I have a courses.json file set up with all the courses and their data.
    This allows me to quickly change the data with the table dynamically to the made changes.

    Functionalities:
    - Sum of all obtained EC's
    - Change the course's status based on grades
    - Progression bar
*/

const table = document.getElementById('dashboard-table');
const totalCreditsElement = document.getElementById('total-credits');

let sumOfCredits = 0;

const baseUrl = window.location.pathname.split('/').slice(0, -1).join('/');
const response = await fetch(`${baseUrl}/data/courses.json`);
const json = await response.json();
const courses = json.courses;

createDashboard();
createProgressBar();

/**
 * Adds assessment rows for each assessment of the course
 * @param {*} course A course with assessments 
 */
function addAssessment(course) {
    // Loop through each assesment to add row for each one
    for (const assessment of course["assessments"]) {
        addRow(assessment, false)
    }
}

/**
 * Adds to the sum of EC's if they are deserved
 * @param {*} property Property of the object
 * @param {*} object A course of a assessment
 */
function sumGrades(property, object) {
    if (property == "grade" && object[property] && object['grade'] > 5.5) {
        sumOfCredits += object["ec"];
    }
}

/**
 * Check if a course with assessement is completed and if it's partly graded
 * @param {*} course The course
 * @returns If it's completed, graded and still on going or not.
 */
function checkAssessments(course) {
    let isCompleted = true;
    let isGraded = false;
    let onGoing = false;
    if (course["assessments"]) {
        for(const assesment of course["assessments"]){
            if(!assesment['grade']){
                onGoing = true;
                continue;
            }
            if (assesment['grade'] < 5.5) {
                isCompleted = false;
            }
            if(assesment['grade']){
                isGraded = true;
            }
        }
    }
    return [isCompleted, isGraded, onGoing];
}

/**
 * Sets course status and adds the deserved EC's
 * @param {*} property The property of the course
 * @param {*} course The course that needs a status
 * @param {*} td Table Row
 */
function checkStatus(property, course, td) {
    if (property == "status") {
        td.classList.add("status");

        const [isCompleted, isGraded, onGoing] = checkAssessments(course);
        // If only one assessment is positivally graded change status of the course
        if(isGraded){
            td.innerText = "Ongoing";
            td.classList.add("status-unknown");
        }
        if (course['grade'] > 5.5 || (isCompleted && isGraded && !onGoing)) {
            td.innerText = "Completed";
            td.classList.add("status-completed");
            td.classList.remove("status-unknown");
        // Failed
        } else if (course['grade'] < 5.5 && course['grade'] || !isCompleted) {
            td.innerText = "Failed";
            td.classList.add("status-failed");
            td.classList.remove("status-unknown");
        }

        // If status is set
        switch (course[property]) {
            case "Not Started":
                td.classList.add("status-not-started");
                break;
            case "Failed":
                td.classList.add("status-failed");
                break;
            case "Completed":
                td.classList.add("status-completed");
                // Add total amount of ec's from the course
                if (course["assessments"]) {
                    for (const assesment of course["assessments"]) {
                        sumOfCredits += assesment["ec"];
                    }
                } else {
                    sumOfCredits += course["ec"];
                }
                break;
            default:
                td.innerText = "Unknown";
                td.classList.add("status-unknown");
                break;
        }
    }
}

/**
 * Adds columns for each property of the object
 * @param {*} object A course or assessment
 * @param {*} isCourse If the given object is a course
 * @param {*} tr The table row element to add the columns to
 */
function addColumns(object, isCourse, tr) {
    for (const property in object) {
        if (property == "assessments") {
            addAssessment(object);
            continue;
        }
        const td = document.createElement('td');
        td.innerText = object[property];
        tr.appendChild(td);

        sumGrades(property, object);

        // Assessments shouldn't be checked on status
        if (!isCourse) { continue; }

        checkStatus(property, object, td);
    }
}

/**
 * Adds row for each course or assessment to the table
 * @param {*} object The course or assessment to create a row of
 * @param {*} isCourse If the given object is a course
 */
function addRow(object, isCourse) {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    addColumns(object, isCourse, tr)
}

/**
 * Generates the dashboard table
 */
function createDashboard() {
    // Add row for each course
    for (const course of courses) {
        addRow(course, true);
    }
    totalCreditsElement.innerText = sumOfCredits;
}

/**
 * Creates the progression bar
 */
function createProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const widthPercentage = (sumOfCredits / 60) * 100;
    progressBar.style.width = widthPercentage + '%';
}
