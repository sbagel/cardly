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
}