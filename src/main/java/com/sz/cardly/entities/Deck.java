package com.sz.cardly.entities;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Deck {
    private int id;
    private int userID;
    private String title;
    private String description;
    private LocalDateTime creationDate;
    private LocalDateTime lastViewDate;
    private boolean isVisible;
}
