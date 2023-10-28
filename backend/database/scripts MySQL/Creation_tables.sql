drop table if exists answer_com;
drop table if exists est_un;
drop table if exists parle_de;
drop table if exists partager;
drop table if exists emprunter;
drop table if exists favoris;
drop table if exists commenter;
drop table if exists post_in_group;
drop table if exists join_group;
drop table if exists Ask_Friend;
drop table if exists friends_with;
drop table if exists post_to_friend;
drop table if exists Post;
drop table if exists GroupeDiscussion;
drop table if exists Theme;
drop table if exists Ebook;
drop table if exists Category;
drop table if exists Admin_biblio;
drop table if exists Clients;


CREATE TABLE Clients (
                        mail_Clients VARCHAR(250),
                        mdp_Clients VARCHAR(50),
                        pseudo_Clients VARCHAR(100) NOT NULL,
                        PRIMARY KEY (mail_Clients),
                        UNIQUE KEY (pseudo_Clients)
);

CREATE TABLE Admin_biblio (
                              mail_admin VARCHAR(250),
                              mdp_admin VARCHAR(50),
                              pseudo_admin VARCHAR(50) NOT NULL,
                              bibliotheque VARCHAR(50),
                              PRIMARY KEY (mail_admin)
);

CREATE TABLE Category (
                          name_category VARCHAR(50),
                          PRIMARY KEY (name_category)
);

CREATE TABLE Ebook (
                       id_ebook INT AUTO_INCREMENT,
                       titre VARCHAR(50),
                       date_parution DATE,
                       auteur VARCHAR(50),
                       nb_pages VARCHAR(50),
                       langue VARCHAR(50),
                       editeur VARCHAR(50),
                       stock INT,
                       name_PDF VARCHAR(50),
                       name_img VARCHAR(50),
                       description VARCHAR(50),
                       mail_admin VARCHAR(250) NOT NULL,
                       PRIMARY KEY (id_ebook),
                       FOREIGN KEY (mail_admin) REFERENCES Admin_biblio(mail_admin)
);

CREATE TABLE Theme (
                       name_theme VARCHAR(50),
                       PRIMARY KEY (name_theme)
);

CREATE TABLE GroupeDiscussion (
                                  Id_GroupeDiscussion INT AUTO_INCREMENT,
                                  nom_groupe VARCHAR(50) NOT NULL,
                                  description TEXT,
                                  PRIMARY KEY (Id_GroupeDiscussion)
);

CREATE TABLE commenter (
                           id_ebook INT,
                           mail_Clients VARCHAR(250),
                           note INT,
                           date_comment DATE NOT NULL,
                           commentaire TEXT NOT NULL,
                           PRIMARY KEY (id_ebook, mail_Clients),
                           FOREIGN KEY (id_ebook) REFERENCES Ebook(id_ebook),
                           FOREIGN KEY (mail_Clients) REFERENCES Clients(mail_Clients)
);

CREATE TABLE Post (
                      Id_Post INT AUTO_INCREMENT,
                      contenu_text_post TEXT NOT NULL,
                      date_envoi_post DATETIME NOT NULL,
                      PRIMARY KEY (Id_Post),
                      UNIQUE KEY (date_envoi_post)
);

CREATE TABLE est_un (
                        name_category VARCHAR(50),
                        id_ebook INT,
                        PRIMARY KEY (name_category, id_ebook),
                        FOREIGN KEY (name_category) REFERENCES Category(name_category),
                        FOREIGN KEY (id_ebook) REFERENCES Ebook(id_ebook)
);

CREATE TABLE emprunter (
                           mail_Clients VARCHAR(250),
                           id_ebook INT,
                           debut_emprunt DATE NOT NULL,
                           fin_emprunt DATE NOT NULL,
                           PRIMARY KEY (mail_Clients, id_ebook),
                           FOREIGN KEY (mail_Clients) REFERENCES Clients(mail_Clients),
                           FOREIGN KEY (id_ebook) REFERENCES Ebook(id_ebook)
);

CREATE TABLE partager (
                          mail_Clients VARCHAR(250),
                          mail_Clients_1 VARCHAR(250),
                          id_ebook INT,
                          debut_partage VARCHAR(50),
                          fin_partage DATE,
                          message_txt_partage VARCHAR(500),
                          PRIMARY KEY (mail_Clients, mail_Clients_1, id_ebook),
                          FOREIGN KEY (mail_Clients) REFERENCES Clients(mail_Clients),
                          FOREIGN KEY (mail_Clients_1) REFERENCES Clients(mail_Clients),
                          FOREIGN KEY (id_ebook) REFERENCES Ebook(id_ebook)
);

CREATE TABLE favoris (
                         mail_Clients VARCHAR(250),
                         id_ebook INT,
                         PRIMARY KEY (mail_Clients, id_ebook),
                         FOREIGN KEY (mail_Clients) REFERENCES Clients(mail_Clients),
                         FOREIGN KEY (id_ebook) REFERENCES Ebook(id_ebook)
);

CREATE TABLE parle_de (
                          id_ebook INT,
                          name_theme VARCHAR(50),
                          PRIMARY KEY (id_ebook, name_theme),
                          FOREIGN KEY (id_ebook) REFERENCES Ebook(id_ebook),
                          FOREIGN KEY (name_theme) REFERENCES Theme(name_theme)
);

CREATE TABLE friends_with (
                              mail_Clients VARCHAR(250),
                              mail_Clients_1 VARCHAR(250),
                              date_friendship DATE NOT NULL,
                              PRIMARY KEY (mail_Clients, mail_Clients_1),
                              FOREIGN KEY (mail_Clients) REFERENCES Clients(mail_Clients),
                              FOREIGN KEY (mail_Clients_1) REFERENCES Clients(mail_Clients)
);

CREATE TABLE post_to_friend (
                                mail_Clients VARCHAR(250),
                                mail_Clients_1 VARCHAR(250),
                                Id_Post INT,
                                PRIMARY KEY (mail_Clients, mail_Clients_1, Id_Post),
                                FOREIGN KEY (mail_Clients) REFERENCES Clients(mail_Clients),
                                FOREIGN KEY (mail_Clients_1) REFERENCES Clients(mail_Clients),
                                FOREIGN KEY (Id_Post) REFERENCES Post(Id_Post)
);

CREATE TABLE post_in_group (
                               mail_Clients VARCHAR(250),
                               Id_GroupeDiscussion INT,
                               Id_Post INT,
                               PRIMARY KEY (mail_Clients, Id_GroupeDiscussion, Id_Post),
                               FOREIGN KEY (mail_Clients) REFERENCES Clients(mail_Clients),
                               FOREIGN KEY (Id_GroupeDiscussion) REFERENCES GroupeDiscussion(Id_GroupeDiscussion),
                               FOREIGN KEY (Id_Post) REFERENCES Post(Id_Post)
);

CREATE TABLE join_group (
                            mail_Clients VARCHAR(250),
                            Id_GroupeDiscussion INT,
                            PRIMARY KEY (mail_Clients, Id_GroupeDiscussion),
                            FOREIGN KEY (mail_Clients) REFERENCES Clients(mail_Clients),
                            FOREIGN KEY (Id_GroupeDiscussion) REFERENCES GroupeDiscussion(Id_GroupeDiscussion)
);

CREATE TABLE answer_com (
                            id_ebook INT,
                            mail_Clients VARCHAR(250),
                            id_ebook_1 INT,
                            mail_Clients_1 VARCHAR(250),
                            Id_Post INT,
                            PRIMARY KEY (id_ebook, mail_Clients, id_ebook_1, mail_Clients_1, Id_Post),
                            FOREIGN KEY (id_ebook, mail_Clients) REFERENCES commenter(id_ebook, mail_Clients),
                            FOREIGN KEY (id_ebook_1, mail_Clients_1) REFERENCES commenter(id_ebook, mail_Clients),
                            FOREIGN KEY (Id_Post) REFERENCES Post(Id_Post)
);

CREATE TABLE Ask_Friend (
                            mail_Clients VARCHAR(250),
                            mail_Clients_1 VARCHAR(250),
                            Status VARCHAR(50),
                            PRIMARY KEY (mail_Clients, mail_Clients_1),
                            FOREIGN KEY (mail_Clients) REFERENCES Clients(mail_Clients),
                            FOREIGN KEY (mail_Clients_1) REFERENCES Clients(mail_Clients)
);