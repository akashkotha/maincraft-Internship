# Java Full Stack Web Development Internship – Task 2

## Database Storage with Spring Data JPA & MySQL

### Project Overview
This project connects the landing page and contact form from Task 1 to a relational database using **Spring Data JPA**. Submitted messages are stored in a `contacts` table in a local **MySQL** database. Additionally, it provides a JSON endpoint to retrieve all stored submissions.

---

## Technical Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (Fetch API / AJAX)
- **Backend**: Java 17, Spring Boot (Spring Web, Spring Data JPA)
- **Database**: MySQL (Default/Production) or H2 (Development/Testing)
- **Build Tool**: Maven

---

## Directory Structure
- `src/main/resources/static/index.html` - Static landing page.
- `src/main/resources/static/css/style.css` - Custom CSS stylesheet.
- `src/main/resources/static/js/app.js` - JavaScript handling form intercept, AJAX submission, and toast alerts.
- `src/main/java/com/example/contactform/Contact.java` - JPA Entity representing a database contact record.
- `src/main/java/com/example/contactform/ContactRepository.java` - Spring Data JPA Repository interface.
- `src/main/java/com/example/contactform/ContactController.java` - REST Controller managing submit/view endpoints.
- `src/main/resources/application.properties` - Main properties (selects active profile).
- `src/main/resources/application-mysql.properties` - Configuration for local MySQL.
- `src/main/resources/application-dev.properties` - Configuration for in-memory H2 database.

---

## How to Set Up the Database

### Option A: Using MySQL (via XAMPP)
1. Install **XAMPP** on your system.
2. Open the **XAMPP Control Panel** and click **Start** next to **MySQL**.
3. Open your browser and go to `http://localhost/phpmyadmin`.
4. Click **New** in the sidebar to create a database named `contact_db`.
5. Ensure `spring.profiles.active=mysql` is set in `src/main/resources/application.properties`.

### Option B: Using In-Memory H2 (For quick local testing)
If you don't have MySQL running, you can test the application using the built-in in-memory H2 database:
1. Open `src/main/resources/application.properties`.
2. Set `spring.profiles.active=dev`.
3. Hibernate will automatically set up the in-memory tables. You can access the H2 web interface at `http://localhost:8081/h2-console` (JDBC URL: `jdbc:h2:mem:contactdb`, Username: `sa`, Password: blank).

---

## Backend Endpoints

### 1. Form Submission (AJAX & URL Encoded)
* **URL**: `/contact`
* **Method**: `POST`
* **Content-Type**: `application/x-www-form-urlencoded`
* **Parameters**: `name`, `email`, `message`

### 2. Form Submission (JSON Payload)
* **URL**: `/submit`
* **Method**: `POST`
* **Content-Type**: `application/json`
* **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello from API!"
  }
  ```

### 3. Retrieve All Messages
* **URL**: `/contacts`
* **Method**: `GET`
* **Response**: A JSON array of all stored entries.
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Hello from API!"
    }
  ]
  ```

---

## How to Run the Application

1. **Compile & Package**:
   ```cmd
   .\mvnw clean package
   ```
2. **Start the Application**:
   ```cmd
   .\mvnw spring-boot:run
   ```
3. **Open the browser**:
   Navigate to [http://localhost:8081](http://localhost:8081) to view the landing page and submit messages. Check [http://localhost:8081/contacts](http://localhost:8081/contacts) to see the saved submissions in JSON format.
