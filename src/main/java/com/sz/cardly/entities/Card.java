package com.sz.cardly.entities;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Card {
    private int id;
    private int deckId;
    private String front;
    private String back;
    private LocalDateTime creationDate;
    private boolean isFavorited;
}
