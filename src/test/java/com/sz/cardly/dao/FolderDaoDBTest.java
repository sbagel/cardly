package com.sz.cardly.dao;

import com.sz.cardly.entities.Folder;
import com.sz.cardly.entities.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class FolderDaoDBTest {

    @Autowired
    FolderDao folderDao;

    @Autowired
    UserDao userDao;

    LocalDateTime date = LocalDateTime.of(2023, 7, 25, 11, 10, 45);

    @BeforeEach
    void setUp() {
        List<Folder> folders = folderDao.getAllFolders();
        folders.forEach(folder -> {
            folderDao.deleteFolderByID(folder.getId());
        });

        List<User> users = userDao.getAllUsers();
        users.forEach(user -> {
            userDao.deleteUserByID(user.getId());
        });
    }

    @Test
    public void testAddAndGetFolderByID(){
        User user = new User();
        user.setUsername("sbagel");
        user.setName("Sophia Bagel");
        user.setPhoto("url");
        user = userDao.addUser(user);

        Folder folder = new Folder();
        folder.setUserID(user.getId());
        folder.setFolderName("Folder1");
        folder.setCreationDate(date);
        folder.setLastViewDate(date);
        folder.setBookmarked(true);
        folder = folderDao.addFolder(folder);

        Folder added = folderDao.getFolderByID(folder.getId());
        assertEquals(folder, added);
    }

    @Test
    public void testGetAllFolders(){
        User user1 = new User();
        user1.setUsername("sbagel");
        user1.setName("Sophia Bagel");
        user1.setPhoto("url");
        user1 = userDao.addUser(user1);

        Folder folder1 = new Folder();
        folder1.setUserID(user1.getId());
        folder1.setFolderName("Folder1");
        folder1.setCreationDate(date);
        folder1.setLastViewDate(date);
        folder1.setBookmarked(true);
        folder1 = folderDao.addFolder(folder1);

        User user2 = new User();
        user2.setUsername("bagels");
        user2.setName("Bagel Sophia");
        user2.setPhoto("url");
        user2 = userDao.addUser(user2);

        Folder folder2 = new Folder();
        folder2.setUserID(user2.getId());
        folder2.setFolderName("Folder2");
        folder2.setCreationDate(date);
        folder2.setLastViewDate(date);
        folder2.setBookmarked(false);
        folder2 = folderDao.addFolder(folder2);

        List<Folder> folders = folderDao.getAllFolders();

        assertEquals(2, folders.size());
        assertTrue(folders.contains(folder1));
        assertTrue(folders.contains(folder2));
    }

    @Test
    public void testUpdateFolder(){
        User user = new User();
        user.setUsername("sbagel");
        user.setName("Sophia Bagel");
        user.setPhoto("url");
        user = userDao.addUser(user);

        Folder folder = new Folder();
        folder.setUserID(user.getId());
        folder.setFolderName("Folder1");
        folder.setCreationDate(date);
        folder.setLastViewDate(date);
        folder.setBookmarked(true);
        folder = folderDao.addFolder(folder);

        Folder updated = folderDao.getFolderByID(folder.getId());
        assertEquals(folder, updated);

        folder.setFolderName("Updated Folder");
        folderDao.updateFolder(folder);
        assertNotEquals(folder, updated);

        updated = folderDao.getFolderByID(folder.getId());
        assertEquals(folder, updated);
    }

    @Test
    public void testDeleteFolderByID(){
        User user = new User();
        user.setUsername("sbagel");
        user.setName("Sophia Bagel");
        user.setPhoto("url");
        user = userDao.addUser(user);

        Folder folder = new Folder();
        folder.setUserID(user.getId());
        folder.setFolderName("Folder1");
        folder.setCreationDate(LocalDateTime.now());
        folder.setLastViewDate(LocalDateTime.now());
        folder.setBookmarked(true);
        folder = folderDao.addFolder(folder);

        boolean isDeleted = folderDao.deleteFolderByID(folder.getId());
        assertTrue(isDeleted);

        Folder deleted = folderDao.getFolderByID(folder.getId());
        assertNull(deleted);
    }
}