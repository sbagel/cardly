package com.sz.cardly.service;

import com.sz.cardly.entities.User;

import java.util.List;

public interface UserService {
    User getUserByID(int id);
    List<User> getAllUsers();
    User addUser(User user);
    boolean updateUser(User user);
    boolean deleteUserByID(int id);
}
