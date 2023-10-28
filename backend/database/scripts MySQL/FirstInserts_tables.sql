# ====================
# TYPES DES EBOOKS
INSERT INTO Category (name_category) VALUES
                                         ('None'),
                                         ('Adventure'),
                                         ('Romance'),
                                         ('Mystery'),
                                         ('Fantasy'),
                                         ('Horror'),
                                         ('Thriller'),
                                         ('Historical Fiction'),
                                         ('Self-Help'),
                                         ('Science'),
                                         ('Dystopian'),
                                         ('Humor'),
                                         ('Crime'),
                                         ('Young Adult'),
                                         ('Philosophy'),
                                         ('Business'),
                                         ('Travel'),
                                         ('Memoir'),
                                         ('Historical'),
                                         ('Children'),
                                         ('Novel'),
                                         ('Graphic Novel');

INSERT INTO Theme (name_theme) VALUES
                                   ('None'),
                                   ('Love'),
                                   ('Friendship'),
                                   ('Family'),
                                   ('War'),
                                   ('Survival'),
                                   ('Identity'),
                                   ('Betrayal'),
                                   ('Forgiveness'),
                                   ('Courage'),
                                   ('Loss'),
                                   ('Resilience'),
                                   ('Redemption'),
                                   ('Discovery'),
                                   ('Hope'),
                                   ('Adventure'),
                                   ('Transformation'),
                                   ('Coming of Age'),
                                   ('Self-Discovery'),
                                   ('Sacrifice'),
                                   ('Justice'),
                                   ('Manga'),
                                   ('Comics');

# ====================
# 1ers INDIVIDUS
-- Insérer des clients fictifs
INSERT INTO Clients (mail_Clients, pseudo_Clients, mdp_Clients)
VALUES
    ('client1@email.com', 'Client1', 'mdpCli1'),
    ('client2@email.com', 'Client2', 'mdpCli2'),
    ('client3@email.com', 'Client3', 'mdpCli3'),
    ('client4@email.com', 'Client4', 'mdpCli4'),
    ('client5@email.com', 'Client5', 'mdpCli5');

-- Insérer des administrateurs fictifs
INSERT INTO Admin_biblio (mail_admin, mdp_admin, pseudo_admin, bibliotheque)
VALUES
    ('admin1@email.com', 'mdpAdmin1', 'Admin1', 'Biblio1'),
    ('admin2@email.com', 'mdpAdmin1', 'Admin2', 'Biblio2'),
    ('admin3@email.com', 'mdpAdmin1', 'Admin3', 'Biblio3');

# ====================
# 1ers EBOOKS
INSERT INTO Ebook (titre, description, stock, name_PDF, mail_admin, date_parution, auteur, nb_pages, langue, editeur, name_img)
VALUES
    ('Bel-ami', 'Description de Bel-ami', 10, 'Bel-ami.pdf', 'admin1@email.com', '2023-01-15', 'Guy de Maupassant', 250, 'Français', 'Éditions XYZ', 'Bel-ami.jpeg'),
    ('La-fille-aux-yeux-d''or', 'Description de La-fille-aux-yeux-d''or', 15, 'La-fille-aux-yeux-d-or.pdf', 'admin2@email.com', '2022-11-20', 'Honoré de Balzac', 220, 'Français', 'Éditions ABC', 'La-Fille-aux-yeux-d-or.jpeg'),
    ('Les-contemplations', 'Description de Les-contemplations', 5, 'Les-contemplations.pdf', 'admin1@email.com', '2023-02-28', 'Victor Hugo', 450, 'Français', 'Éditions DEF', 'les-contemplations.jpeg'),
    ('Britannicus', 'Description de Britannicus', 8, 'Britannicus.pdf', 'admin3@email.com', '2023-03-10', 'Jean Racine', 180, 'Français', 'Éditions GHI', 'britannicus.jpeg'),
    ('corniche-kennedy', 'Description de corniche-kennedy', 12, 'corniche-kennedy.pdf', 'admin2@email.com', '2022-12-05', 'Maylis de Kerangal', 300, 'Français', 'Éditions JKL', 'corniche-kennedy.jpeg'),
    ('illusions-perdues', 'Description de illusions-perdues', 7, 'illusions-perdues.pdf', 'admin1@email.com', '2023-03-25', 'Honoré de Balzac', 320, 'Français', 'Éditions MNO', 'illusion-perdues.jpeg'),
    ('lettre-de-mon-moulin', 'Description de lettre-de-mon-moulin', 11, 'lettre-de-mon-moulin.pdf', 'admin2@email.com', '2022-10-10', 'Alphonse Daudet', 200, 'Français', 'Éditions PQR', 'lettre-de-mon-moulin.jpeg'),
    ('micromegas', 'Description de micromegas', 14, 'micromegas.pdf', 'admin3@email.com', '2022-09-15', 'Voltaire', 160, 'Français', 'Éditions STU', 'micromegas.jpg'),
    ('one-piece-96', 'Description de one-piece-96', 20, 'one-piece-96.pdf', 'admin1@email.com', '2023-04-05', 'Eiichiro Oda', 190, 'Japonais', 'Éditions VWX', 'one-piece-96.jpg'),
    ('one-piece-97', 'Description de one-piece-97', 18, 'one-piece-97.pdf', 'admin2@email.com', '2023-04-12', 'Eiichiro Oda', 195, 'Japonais', 'Éditions YZ1', 'one-piece-97.jpg'),
    ('one-piece-98', 'Description de one-piece-98', 16, 'one-piece-98.pdf', 'admin3@email.com', '2023-04-19', 'Eiichiro Oda', 200, 'Japonais', 'Éditions ZA2', 'one-piece-98.jpg'),
    ('pauca-meae', 'Description de pauca-meae', 9, 'pauca-meae.pdf', 'admin1@email.com', '2023-01-30', 'Victor Hugo', 240, 'Français', 'Éditions XYZ', 'Pauca-meae.jpeg');

# ====================
# 1eres INTERACTIONS ENTRE LES INDIVIDUS ET LES EBOOKS
-- Ajouter des tuples dans la table emprunter
INSERT INTO emprunter (mail_Clients, id_ebook, debut_emprunt, fin_emprunt) VALUES
                                                                              ('client1@email.com', 1, '2023-05-01', '2023-05-15'),
                                                                              ('client2@email.com', 2, '2023-05-02', '2023-05-16'),
                                                                              ('client3@email.com', 3, '2023-05-03', '2023-05-17');

-- Ajouter des tuples dans la table commenter
INSERT INTO commenter (id_ebook, mail_Clients, note, date_comment, commentaire) VALUES
                                                                                   (1, 'client1@email.com', 4, '2023-05-05', 'Super livre!'),
                                                                                   (2, 'client2@email.com', 5, '2023-05-06','The Emperor Approves !'),
                                                                                   (3, 'client3@email.com', 3, '2023-05-07','Pas mal du tout');

-- Ajouter des tuples dans la table favoris
INSERT INTO favoris (mail_Clients, id_ebook) VALUES
                                                ('client1@email.com', 1),
                                                ('client2@email.com', 2),
                                                ('client3@email.com', 3);

-- Ajouter des tuples dans la table partager
INSERT INTO partager (mail_Clients, mail_Clients_1, id_ebook, debut_partage, fin_partage, message_txt_partage) VALUES
                                                                                                                 ('client1@email.com', 'client2@email.com', 1, '2023-05-01', '2023-05-15', 'Partage de livre'),
                                                                                                                 ('client2@email.com', 'client3@email.com', 2, '2023-05-02', '2023-05-16', 'Partage de livre'),
                                                                                                                 ('client3@email.com', 'client1@email.com', 3, '2023-05-03', '2023-05-17', 'Partage de livre');

-- Liens vers les catégories
INSERT INTO est_un (name_category, id_ebook) VALUES
                                                 ('Adventure', 1), ('Romance', 1), ('Mystery', 1),
                                                 ('Romance', 2), ('Historical Fiction', 2),
                                                 ('Adventure', 3), ('Fantasy', 3),
                                                 ('Romance', 4), ('Mystery', 4),
                                                 ('Romance', 5), ('Historical Fiction', 5),
                                                 ('Mystery', 6), ('Dystopian', 6),
                                                 ('Adventure', 7), ('Fantasy', 7);
-- Ajoutez d'autres catégories ici en respectant le maximum de 3 par livre

-- Liens vers les thèmes
INSERT INTO parle_de (id_ebook, name_theme) VALUES
                                                (1, 'Love'), (1, 'Transformation'), (1, 'Identity'),
                                                (2, 'Love'), (2, 'Adventure'),
                                                (3, 'Adventure'), (3, 'Identity'),
                                                (4, 'Love'), (4, 'Adventure'), (4, 'Betrayal'),
                                                (5, 'Love'), (5, 'Resilience'), (5, 'Betrayal'),
                                                (6, 'Friendship'), (6, 'Hope'), (6, 'Justice'),
                                                (7, 'Adventure'), (7, 'Coming of Age'), (7, 'Identity');
-- Ajoutez d'autres thèmes ici en respectant le maximum de 3 par livre

-- Ajouter des demandes d'amitié entre clients
INSERT INTO Ask_Friend (mail_Clients, mail_Clients_1, Status) VALUES
                                                                ('client1@email.com', 'client2@email.com', 'Pending'),
                                                                ('client2@email.com', 'client3@email.com', 'Pending'),
                                                                ('client3@email.com', 'client4@email.com', 'Pending');

-- Indiquer que des clients sont amis
INSERT INTO friends_with (mail_Clients, mail_Clients_1, date_friendship) VALUES
                                                                           ('client1@email.com', 'client2@email.com', '2023-05-01'),
                                                                           ('client2@email.com', 'client3@email.com', '2023-05-02'),
                                                                           ('client4@email.com', 'client5@email.com', '2023-05-03');