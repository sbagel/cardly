package com.sz.cardly.controller;

import com.sz.cardly.entities.Deck;
import com.sz.cardly.service.DeckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/deck")
public class DeckController {
    @Autowired
    private DeckService deckService;

    @GetMapping("/all")
    public List<Deck> getAllDecks() {
        return deckService.getAllDecks();
    }

    @GetMapping("/{id}")
    public Deck getDeckById(@PathVariable("id") int id) {
        return deckService.getDeckByID(id);
    }

    @PostMapping("/add")
    public Deck addDeck(@RequestBody Deck deck) {
        LocalDateTime date = LocalDateTime.now();
        deck.setCreationDate(date);
        deck.setLastViewDate(date);

        return deckService.addDeck(deck);
    }

    @PutMapping("/{id}")
    public boolean updateDeck(@PathVariable("id") int id,@RequestBody Deck deck) {
        Deck original = deckService.getDeckByID(id);
        deck.setCreationDate(original.getCreationDate());
        deck.setLastViewDate(LocalDateTime.now());
        deck.setId(id);
        return deckService.updateDeck(deck);
    }

    @DeleteMapping("/{id}")
    public boolean deleteDeck(@PathVariable("id") int id) {
        return deckService.deleteDeckByID(id);
    }
}
