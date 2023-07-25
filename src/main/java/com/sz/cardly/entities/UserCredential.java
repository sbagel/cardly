package com.sz.cardly.entities;

import lombok.Data;

@Data
public class UserCredential {
    private int id;
    private String email;
    private String passwordHash;
}
