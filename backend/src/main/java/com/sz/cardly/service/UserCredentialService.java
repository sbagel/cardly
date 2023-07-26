package com.sz.cardly.service;

import com.sz.cardly.entities.UserCredential;

import java.util.List;

public interface UserCredentialService {
    UserCredential getUserCredentialByID(int id);
    List<UserCredential> getAllUserCredentials();
    UserCredential addUserCredential(UserCredential userCredential);
    boolean updateUserCredential(UserCredential userCredential);
    boolean deleteUserCredentialByID(int id);
}
