# Java Full Stack Web Development Internship – Task 1

## Landing Page + Contact Form

### Project Overview
This is the first task of the Java Full Stack Web Development Internship. The goal is to build a complete full-stack flow: a modern static landing page with a contact form that sends data to a Java Spring Boot backend, which then prints the submitted form data to the console.

---

## Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (Fetch API for AJAX)
- **Backend**: Java 17, Spring Boot (Spring Web)
- **Build Tool**: Maven

---

## Directory Structure
- `src/main/resources/static/index.html` - The modern landing page.
- `src/main/resources/static/css/style.css` - Custom styling for the landing page.
- `src/main/resources/static/js/app.js` - JavaScript handling UI interactions (menu toggle, active links scroll, AJAX form submission, and toast notifications).
- `src/main/java/com/example/contactform/ContactController.java` - Spring Boot RestController to handle the `/contact` form submission.
- `src/main/java/com/example/contactform/ContactformApplication.java` - Spring Boot main entry point.

---

## How to Run the Application

1. **Compile the project**:
   Open a terminal in the project root directory and run:
   ```cmd
   .\mvnw clean compile
   ```

2. **Start the server**:
   Run the Spring Boot application using:
   ```cmd
   .\mvnw spring-boot:run
   ```

3. **Access the landing page**:
   Once the console shows that Tomcat has started (by default on port `8081`), open your web browser and navigate to:
   [http://localhost:8081](http://localhost:8081)

---

## How it Works

1. **Frontend**:
   - The landing page collects the user's **Name**, **Email**, and **Message**.
   - When the user clicks the "Send Message" button, JavaScript intercepts the form submission to prevent page reload.
   - It performs basic client-side validation and uses the browser's `Fetch API` to send a POST request with the form data to the `/contact` endpoint on the server.
   - Feedback is shown to the user via animated toast notifications.

2. **Backend**:
   - The Spring Boot controller `ContactController` listens for POST requests at `/contact`.
   - The form parameters are parsed using `@RequestParam`.
   - The backend logs the received submission to the console:
     `Name: [name], Email: [email], Message: [message]`
   - It sends a success string response back to the client.
