// ==========================================
// EXP 14: MongoDB - Student Management
// ==========================================

// Select/create database
use studentmanagement


// Create students collection
db.createCollection("students")


// Insert at least 3 documents
db.students.insertMany([
    {
        name: "Aman Sharma",
        branch: "CSE",
        email: "aman@gmail.com",
        enrollment_date: new Date("2024-02-10")
    },
    {
        name: "Priya Singh",
        branch: "ECE",
        email: "priya@gmail.com",
        enrollment_date: new Date("2023-12-15")
    },
    {
        name: "Rahul Verma",
        branch: "CSE",
        email: "rahul@gmail.com",
        enrollment_date: new Date("2024-03-20")
    }
])


// Display all documents
db.students.find()


// Find CSE students
db.students.find({
    branch: "CSE"
})


// Find students enrolled after January 2024
db.students.find({
    enrollment_date: {
        $gte: new Date("2024-02-01")
    }
})


// Update branch
db.students.updateOne(
    { name: "Priya Singh" },
    { $set: { branch: "CSE" } }
)


// Check updated documents
db.students.find()


// Delete a document
db.students.deleteOne({
    name: "Rahul Verma"
})


// Check remaining documents
db.students.find()