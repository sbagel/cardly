package com.sz.cardly.controller;

import com.sz.cardly.entities.Card;
import com.sz.cardly.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/card")
public class CardController {
    @Autowired
    CardService cardService;

    @GetMapping("/all")
    public List<Card> getAllCardsByDeckId(@RequestParam("deckId") int deckId) {
        return cardService.getAllCardsByDeckId(deckId);
    }

    @GetMapping("/{id}")
    public Card getCardById(@PathVariable("id") int id) {
        return cardService.getCardById(id);
    }

    @PostMapping("/add")
    public Card addCard(@RequestBody Card card) {
        LocalDateTime date = LocalDateTime.now();
        card.setCreationDate(date);

        return cardService.addCard(card);
    }

    @PutMapping("/{id}")
    public boolean updateCard(@PathVariable("id") int id,@RequestBody Card card) {
        Card original = cardService.getCardById(id);
        card.setCreationDate(original.getCreationDate());
        card.setId(id);
        return cardService.updateCard(card);
    }

    @DeleteMapping("/{id}")
    public boolean deleteCard(@PathVariable("id") int id) {
        return cardService.deleteCardById(id);
    }
}
