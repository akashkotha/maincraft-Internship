package com.example.contactform;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;

@RestController
public class ContactController {

    @Autowired
    private ContactRepository repo;

    // Starter code POST endpoint accepting JSON payload
    @PostMapping("/submit")
    public Contact saveContact(@RequestBody Contact contact) {
        return repo.save(contact);
    }

    // URL encoded POST endpoint for Task 1 frontend compatibility
    @PostMapping("/contact")
    public String handleContact(@RequestParam String name,
                                @RequestParam String email,
                                @RequestParam String message) {
        // Output submitted data to system console as requested
        System.out.println("Saving contact - Name: " + name + ", Email: " + email + ", Message: " + message);
        
        Contact contact = new Contact(name, email, message);
        repo.save(contact);
        
        return "Form submitted successfully!";
    }

    // GET endpoint returning all contacts in JSON
    @GetMapping("/contacts")
    public List<Contact> getAllContacts() {
        return repo.findAll();
    }

    // DELETE endpoint to remove a contact by ID
    @DeleteMapping("/contacts/{id}")
    public void deleteContact(@PathVariable Long id) {
        repo.deleteById(id);
    }

    // DELETE endpoint to clear all contacts
    @DeleteMapping("/contacts")
    public void deleteAllContacts() {
        repo.deleteAll();
    }
}
