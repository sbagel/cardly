package com.sz.cardly.controller;

import com.sz.cardly.entities.Folder;
import com.sz.cardly.entities.FolderDeck;
import com.sz.cardly.service.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/folder")
public class FolderController {
    @Autowired
    private FolderService folderService;

    @GetMapping("/all")
    public List<Folder> getAllFoldersByUserId (@RequestParam("userId") int userId) {
        return folderService.getAllFoldersByUserId(userId);
    }

    @GetMapping("/all/byDeck")
    public List<Folder> getAllFoldersByDeckId(@RequestParam("deckID") int deckID){
        return folderService.getAllFoldersByDeckId(deckID);
    }

    @GetMapping("/{id}")
    public Folder getFolderById(@PathVariable("id") int id) {
        return folderService.getFolderByID(id);
    }

    @PostMapping("/add")
    public Folder addFolder(@RequestBody Folder folder) {
        LocalDateTime date = LocalDateTime.now();
        folder.setCreationDate(date);
        folder.setLastViewDate(date);

        return folderService.addFolder(folder);
    }

    @PostMapping("/addDeck")
    public boolean addDeckToFolder(@RequestBody FolderDeck dto) {
        return folderService.addDeckToFolder(dto.getFolderID(), dto.getDeckID());
    }

    @PutMapping("/{id}")
    public boolean updateFolder(@PathVariable("id") int id,@RequestBody Folder folder) {
        Folder original = folderService.getFolderByID(id);
        folder.setCreationDate(original.getCreationDate());
        folder.setLastViewDate(LocalDateTime.now());
        folder.setId(id);
        return folderService.updateFolder(folder);
    }

    @DeleteMapping("/{id}")
    public boolean deleteFolder(@PathVariable("id") int id) {
        return folderService.deleteFolderByID(id);
    }
}
