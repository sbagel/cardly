package com.sz.cardly.entities;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Deck {
    private int id;
    private int userID;
    private String title;
    private String description;
    private LocalDateTime creationDate;
    private LocalDateTime lastViewDate;
    private boolean isVisible;
    private List<Folder> folders;
}
