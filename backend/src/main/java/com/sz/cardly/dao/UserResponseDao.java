package com.sz.cardly.dao;

import com.sz.cardly.entities.UserResponse;

import java.util.List;

public interface UserResponseDao {
    UserResponse getUserResponseByID(int responseID);
    List<UserResponse> getAllUserResponses();
    UserResponse addUserResponse(UserResponse userResponse);
    boolean updateUserResponse(UserResponse userResponse);
    boolean deleteUserResponseByID(int responseID);
}