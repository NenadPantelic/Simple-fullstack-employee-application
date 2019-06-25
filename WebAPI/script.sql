CREATE TABLE dbo.Department
(

	DeparmentID bigint IDENTITY(1,1) NOT NULL,
	DeparmentName varchar(100)

);

CREATE TABLE dbo.Employee
(
	EmployeeID bigint IDENTITY(1,1) NOT NULL,
	EmployeeName varchar(100),
	Department varchar(100),
	Mail varchar(100),
	DateOfJoining date

);



select DeparmentID, DeparmentName from Department;
select EmployeeID, EmployeeName, Department, Mail, DateOfJoining from Employee;
INSERT INTO dbo.Department VALUES('Finance'),('Logistics');
INSERT INTO dbo.Employee VALUES('Sam Jackson', 'Finance', 'sam123@gmail.com', '2019-04-22'),('John Doe', 'Logistics', 'jdoe@gmail.com', '2019-01-01');