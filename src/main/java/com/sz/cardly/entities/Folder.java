package com.sz.cardly.entities;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Folder {
    private int id;
    private int userID;
    private String folderName;
    private LocalDateTime creationDate;
    private LocalDateTime lastViewDate;
    private boolean isBookmarked;
}
