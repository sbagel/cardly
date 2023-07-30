package com.sz.cardly.dao;

import com.sz.cardly.entities.User;

import java.util.List;

public interface UserDao {
    User getUserByID(int id);
    User getUserByUsername(String username);
    List<User> getAllUsers();
    User addUser(User user);
    boolean updateUser(User user);
    boolean deleteUserByID(int id);
}
