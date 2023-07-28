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
    public Deck addDeck(@RequestBody Deck folder) {
        LocalDateTime date = LocalDateTime.now();
        folder.setCreationDate(date);
        folder.setLastViewDate(date);

        return deckService.addDeck(folder);
    }

    @PutMapping("/{id}")
    public boolean updateDeck(@PathVariable("id") int id,@RequestBody Deck folder) {
        Deck original = deckService.getDeckByID(id);
        folder.setCreationDate(original.getCreationDate());
        folder.setLastViewDate(LocalDateTime.now());
        folder.setId(id);
        return deckService.updateDeck(folder);
    }

    @DeleteMapping("/{id}")
    public boolean deleteDeck(@PathVariable("id") int id) {
        return deckService.deleteDeckByID(id);
    }
}
