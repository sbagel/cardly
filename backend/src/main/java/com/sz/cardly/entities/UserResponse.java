package com.sz.cardly.entities;

import lombok.Data;

@Data
public class UserResponse {
    private int id;
    private int sessionID;
    private int cardID;
    private String userAnswerText;
    private float score;
}
