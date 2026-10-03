# Lab: Relational vs Document Databases — PostgreSQL & MongoDB

## Aim

To understand and compare relational and document-oriented databases using PostgreSQL and MongoDB.

---

## PostgreSQL

Database Name: `studentmanagement`

Table Name: `students`

The students table contains:

- id
- name
- branch
- email
- enrollment_date

Five student records were inserted.

The following operations were performed:

1. Display all students.
2. Find students belonging to CSE.
3. Find students enrolled after January 2024.
4. Update the branch of a student.
5. Delete a student record.

---

## MongoDB

Database Name: `studentmanagement`

Collection Name: `students`

Three student documents were inserted.

Operations such as find, update and delete were performed on the collection.

---

## PostgreSQL vs MongoDB

PostgreSQL is a relational database that stores information in tables
consisting of rows and columns. It uses a predefined schema and SQL
for querying data.

MongoDB is a NoSQL document database that stores information as
flexible BSON documents. Documents in the same collection do not
necessarily need to have exactly the same structure.

In PostgreSQL, inserting data requires following the structure of the
table. MongoDB provides more flexibility because documents can contain
different fields.

PostgreSQL queries use SQL commands such as SELECT, INSERT, UPDATE and
DELETE, whereas MongoDB uses commands such as find(), insertMany(),
updateOne() and deleteOne().

PostgreSQL is particularly suitable for structured data and applications
requiring relationships and strong relational constraints. MongoDB is
useful when flexible document structures and rapidly changing data
models are required.

## Conclusion

The experiment demonstrates the basic differences between relational
and document-oriented databases. PostgreSQL provides a structured,
schema-based relational model, while MongoDB provides a flexible
document-based model.