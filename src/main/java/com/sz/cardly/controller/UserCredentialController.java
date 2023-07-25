package com.sz.cardly.controller;

import com.sz.cardly.entities.UserCredential;
import com.sz.cardly.service.UserCredentialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cred")
public class UserCredentialController {
    @Autowired
    UserCredentialService userCredentialService;
    @GetMapping("/all")
    public List<UserCredential> getAllUsers(){
        return userCredentialService.getAllUserCredentials();
    }

    @GetMapping("/{id}")
    public UserCredential getUserById(@PathVariable("id") int id){
        return userCredentialService.getUserCredentialByID(id);
    }

    @PostMapping("/add")
    public UserCredential addUser(@RequestBody UserCredential user){
        System.out.print(user);
        return userCredentialService.addUserCredential(user);
    }

    @PutMapping("/{id}")
    public boolean updateUser(@RequestBody UserCredential user){
        return userCredentialService.updateUserCredential(user);
    }

    @DeleteMapping("/{id}")
    public boolean deleteUser(@PathVariable("id") int id){
        return userCredentialService.deleteUserCredentialByID(id);
    }
}
