CREATE TABLE titles(
	title_id varchar(5) PRIMARY KEY,
	title varchar(50)
);

CREATE TABLE employees(
	emp_no int,
	emp_title_id varchar(5),
	birth_date varchar,
	first_name varchar(30),
	last_name varchar(30),
	sex varchar(1),
	hire_date varchar,
	PRIMARY KEY (emp_no),
	FOREIGN KEY (emp_title_id) REFERENCES titles(title_id)
);

CREATE TABLE salaries(
	emp_no int,
	salary int,
	FOREIGN KEY (emp_no) REFERENCES employees(emp_no)
);

CREATE TABLE departments(
	dept_no varchar(4) PRIMARY KEY,
	dept_name varchar(50)
);

CREATE TABLE dept_manager(
	dept_no varchar(4),
	emp_no int,
	FOREIGN KEY (dept_no) REFERENCES departments(dept_no),
	FOREIGN KEY (emp_no) REFERENCES employees(emp_no)
);

CREATE TABLE dept_emp(
	emp_no int,
	dept_no varchar(4),
	FOREIGN KEY (emp_no) REFERENCES employees(emp_no),
	FOREIGN KEY (dept_no) REFERENCES departments(dept_no)
);