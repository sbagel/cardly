package com.sz.cardly.service;

import com.sz.cardly.dao.UserCredentialDao;
import com.sz.cardly.entities.UserCredential;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserCredentialServiceImpl implements UserCredentialService{
    @Autowired
    UserCredentialDao userCredentialDao;
    @Override
    public UserCredential getUserCredentialByID(int id) {
        return userCredentialDao.getUserCredentialByID(id);
    }

    @Override
    public List<UserCredential> getAllUserCredentials() {
        return userCredentialDao.getAllUserCredentials();
    }

    @Override
    public UserCredential addUserCredential(UserCredential userCredential) {
        return userCredentialDao.addUserCredential(userCredential);
    }

    @Override
    public boolean updateUserCredential(UserCredential userCredential) {
        return userCredentialDao.updateUserCredential(userCredential);
    }

    @Override
    public boolean deleteUserCredentialByID(int id) {
        return userCredentialDao.deleteUserCredentialByID(id);
    }
}
