
function setAutoInput(value) {
    document.getElementById('pdf-link').value = value;
}

const { jsPDF } = window.jspdf;

function createRandomFirstName() {
    const names = [
        "Peter", "Julian", "Phil", "Emma", "Liam", "Olivia", "Noah", "Ava", "Sophia", "Jackson",
        "Isabella", "Lucas", "Mia", "Aiden", "Harper", "Ethan", "Amelia", "Logan", "Evelyn", "Oliver",
        "Abigail", "Elijah", "Charlotte", "Caleb", "Grace", "Mason", "Lily", "Samuel"
    ];
    const random = Math.floor(Math.random() * names.length);
    return names[random];
}

function createRandomLastName() {
    const names = [
        "Lewis", "Edmunds", "Buckland", "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis",
        "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris",
        "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Lewis", "Lee", "Walker", "Hall"
    ];
    const random = Math.floor(Math.random() * names.length);
    return names[random];
}

function getRandomSubject() {
    const subjects = [
        "math",
        "science",
        "english",
        "biology",
        "chemistry",
        "physics",
        "history",
        "geography",
        "literature",
        "computer-science",
        "sociology",
        "psychology",
        "economics",
        "political-science",
        "art",
        "music",
        "physical-education",
        "astronomy",
        "environmental-science",
        "philosophy",
        "linguistics",
        "anthropology"
    ];
    const random = Math.floor(Math.random() * subjects.length);
    return subjects[random];
}
 
function gen() {
    const random = `${Math.floor(Math.random() * 20)}${Math.floor(Math.random() * 20)}${Math.floor(Math.random() * 20)}`;
    const firstName = document.getElementById('pdf-first-name').value;
    const lastName = document.getElementById('pdf-last-name').value;
    const subject = getRandomSubject();
    const url = document.getElementById('pdf-link').value;

    const doc = new jsPDF({
        unit: "in",
        format: [8.5, 11]
    });

    doc.setFontSize(32);
    doc.text(`${subject.charAt(0).toUpperCase() + subject.slice(1)} Study Guide Unit 3`, 1, 1);

    doc.setFontSize(22);
    const first = createRandomFirstName();
    const last = createRandomLastName();
    doc.text(`Name: ${firstName ? firstName : first}, ${lastName ? lastName : last}`, 1, 1.5);
    doc.text(`Date: ${new Date().toLocaleString()}`, 1, 2);

    doc.setFontSize(16);
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    const lines = doc.splitTextToSize(text, 6);
    let line = 3;
    for (let i = 0; i < lines.length; i++) {
        doc.text(`${lines[i]}`, 1, line);
        line += 0.5;
    }

    doc.text(`${lines.length}`, 1, 5);
    doc.setFontSize(10);
  

    const linkText = "https://kamiapp.com/";

    // Calculate the x-coordinate for the link
    const linkX = doc.internal.pageSize.width - doc.getStringUnitWidth(linkText) * 0.2; // Adjust the factor as needed
    
    // Add the link to the document
    doc.textWithLink(linkText, linkX, 10.5, {
        url: url // Use the value of the const url as the actual URL
    });

    doc.save(`${subject.charAt(0).toUpperCase() + subject.slice(1)}_Study_Guide_Unit_3_${firstName ? firstName : createRandomFirstName()}_${lastName ? lastName : createRandomLastName()}-${random}.pdf`);
}