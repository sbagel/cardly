package com.sz.cardly.dao;

import com.sz.cardly.entities.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserDaoDBTest {

    @Autowired
    UserDao userDao;

    @BeforeEach
    public void setUp() {
        List<User> users = userDao.getAllUsers();
        users.forEach(user -> {
            userDao.deleteUserByID(user.getId());
        });
    }

    @Test
    public void testAddAndGetUserByID(){
        User user = new User();
        user.setUsername("sbagel");
        user.setName("Sophia Bagel");
        user.setPhoto("url");
        user = userDao.addUser(user);

        User added = userDao.getUserByID(user.getId());
        assertEquals(user, added);
    }

    @Test
    public void testGetAllUsers(){
        User user1 = new User();
        user1.setUsername("sbagel");
        user1.setName("Sophia Bagel");
        user1.setPhoto("url");
        user1 = userDao.addUser(user1);

        User user2 = new User();
        user2.setUsername("bagels");
        user2.setName("Bagel Sophia");
        user2.setPhoto("url");
        user2 = userDao.addUser(user2);

        List<User> users = userDao.getAllUsers();

        assertEquals(2, users.size());
        assertTrue(users.contains(user1));
        assertTrue(users.contains(user2));
    }

    @Test
    public void testUpdateUser(){
        User user = new User();
        user.setUsername("sbagel");
        user.setName("Sophia Bagel");
        user.setPhoto("url");
        user = userDao.addUser(user);

        User updated = userDao.getUserByID(user.getId());
        assertEquals(user, updated);

        user.setName("Soph Bagel");
        userDao.updateUser(user);
        assertNotEquals(user, updated);

        updated = userDao.getUserByID(user.getId());
        assertEquals(user, updated);
    }

    @Test
    public void testDeleteUserByID(){
        User user = new User();
        user.setUsername("sbagel");
        user.setName("Sophia Bagel");
        user.setPhoto("url");
        user = userDao.addUser(user);

        boolean isDeleted = userDao.deleteUserByID(user.getId());
        assertTrue(isDeleted);

        User deleted = userDao.getUserByID(user.getId());
        assertNull(deleted);
    }
}