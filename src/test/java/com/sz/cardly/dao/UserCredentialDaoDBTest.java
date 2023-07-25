package com.sz.cardly.dao;

import com.sz.cardly.entities.User;
import com.sz.cardly.entities.UserCredential;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserCredentialDaoDBTest {

    @Autowired
    UserCredentialDao userCredentialDao;

    @Autowired
    UserDao userDao;

    @BeforeEach
    public void setUp() {
        List<User> users = userDao.getAllUsers();
        users.forEach(user -> {
            userDao.deleteUserByID(user.getId());
        });

        List<UserCredential> credentials = userCredentialDao.getAllUserCredentials();
        credentials.forEach(credential -> {
            userCredentialDao.deleteUserCredentialByID(credential.getId());
        });
    }

    @Test
    public void testAddAndGetUserCredentialByID(){
        User user = new User();
        user.setUsername("sbagel");
        user.setName("Sophia Bagel");
        user.setPhoto("url");
        user = userDao.addUser(user);

        UserCredential userCredential = new UserCredential();
        userCredential.setId(user.getId());
        userCredential.setEmail("newemail@email.com");
        userCredential.setPasswordHash("12345");
        userCredential = userCredentialDao.addUserCredential(userCredential);

        UserCredential added = userCredentialDao.getUserCredentialByID(userCredential.getId());
        assertEquals(userCredential, added);
    }

    @Test
    public void testGetAllUserCredentials(){
        User user1 = new User();
        user1.setUsername("sbagel");
        user1.setName("Sophia Bagel");
        user1.setPhoto("url");
        user1 = userDao.addUser(user1);

        UserCredential userCredential1 = new UserCredential();
        userCredential1.setId(user1.getId());
        userCredential1.setEmail("newemail1@email.com");
        userCredential1.setPasswordHash("12345");
        userCredential1 = userCredentialDao.addUserCredential(userCredential1);

        User user2 = new User();
        user2.setUsername("bagels");
        user2.setName("Bagel Sophia");
        user2.setPhoto("url");
        user2 = userDao.addUser(user2);

        UserCredential userCredential2 = new UserCredential();
        userCredential2.setId(user2.getId());
        userCredential2.setEmail("newemail2@email.com");
        userCredential2.setPasswordHash("54321");
        userCredential2 = userCredentialDao.addUserCredential(userCredential2);

        List<UserCredential> credentials = userCredentialDao.getAllUserCredentials();

        assertEquals(2, credentials.size());
        assertTrue(credentials.contains(userCredential1));
        assertTrue(credentials.contains(userCredential2));
    }

    @Test
    public void testUpdateUserCredential(){
        User user = new User();
        user.setUsername("sbagel");
        user.setName("Sophia Bagel");
        user.setPhoto("url");
        user = userDao.addUser(user);

        UserCredential userCredential = new UserCredential();
        userCredential.setId(user.getId());
        userCredential.setEmail("newemail@email.com");
        userCredential.setPasswordHash("12345");
        userCredential = userCredentialDao.addUserCredential(userCredential);

        UserCredential updated = userCredentialDao.getUserCredentialByID(user.getId());
        assertEquals(userCredential, updated);

        userCredential.setEmail("emailnew@email.com");
        userCredentialDao.updateUserCredential(userCredential);
        assertNotEquals(userCredential, updated);

        updated = userCredentialDao.getUserCredentialByID(user.getId());
        assertEquals(userCredential, updated);
    }

    @Test
    public void testDeleteUserCredentialByID(){
        User user = new User();
        user.setUsername("sbagel");
        user.setName("Sophia Bagel");
        user.setPhoto("url");
        user = userDao.addUser(user);

        UserCredential userCredential = new UserCredential();
        userCredential.setId(user.getId());
        userCredential.setEmail("newemail@email.com");
        userCredential.setPasswordHash("12345");
        userCredential = userCredentialDao.addUserCredential(userCredential);

        boolean isDeleted = userDao.deleteUserByID(user.getId());
        assertTrue(isDeleted);

        UserCredential deletedCredential = userCredentialDao.getUserCredentialByID(user.getId());
        assertNull(deletedCredential);
    }

}