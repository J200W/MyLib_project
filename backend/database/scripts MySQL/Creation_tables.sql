create table Admin_biblio
(
    mail_admin   varchar(250) default '' not null
        primary key,
    mdp_admin    varchar(50)             null,
    pseudo_admin varchar(50)             not null,
    bibliotheque varchar(50)             not null
);

create table Category
(
    name_category varchar(50) default '' not null
        primary key
);

create table Clients
(
    mail_Clients   varchar(250) default '' not null
        primary key,
    mdp_Clients    varchar(50)             null,
    pseudo_Clients varchar(100)            not null,
    constraint pseudo_Clients
        unique (pseudo_Clients)
);

create table Ebook
(
    id_ebook      bigint auto_increment
        primary key,
    titre         varchar(50)   not null,
    date_parution date          null,
    auteur        varchar(50)   null,
    nb_pages      varchar(50)   null,
    langue        varchar(100)  null,
    editeur       varchar(50)   null,
    name_img      varchar(50)   null,
    name_PDF      varchar(200)  null,
    id_Biblio     varchar(250)  null,
    description   varchar(1000) not null,
    stock         int           not null,
    constraint Ebook_ibfk_1
        foreign key (id_Biblio) references Admin_biblio (mail_admin)
);

create index id_Biblio
    on Ebook (id_Biblio);

create table Theme
(
    name_theme varchar(50) default '' not null
        primary key
);

create table commenter
(
    mail_Clients varchar(250) default '' not null,
    id_ebook     bigint       default 0  not null,
    note         int                     null,
    commentaire  varchar(50)             null,
    date_comment date                    not null,
    primary key (mail_Clients, id_ebook),
    constraint commenter_ibfk_1
        foreign key (mail_Clients) references Clients (mail_Clients),
    constraint commenter_ibfk_2
        foreign key (id_ebook) references Ebook (id_ebook)
);

create index id_ebook
    on commenter (id_ebook);

create table emprunter
(
    mail_Clients  varchar(250) default '' not null,
    id_ebook      bigint       default 0  not null,
    debut_emprunt date                    not null,
    fin_emprunt   date                    not null,
    stock_emprunt int                     not null,
    primary key (mail_Clients, id_ebook),
    constraint emprunter_ibfk_1
        foreign key (mail_Clients) references Clients (mail_Clients),
    constraint emprunter_ibfk_2
        foreign key (id_ebook) references Ebook (id_ebook)
);

create index id_ebook
    on emprunter (id_ebook);

create table est_un
(
    name_category varchar(50) default '' not null,
    id_ebook      bigint      default 0  not null,
    primary key (name_category, id_ebook),
    constraint est_un_ibfk_1
        foreign key (name_category) references Category (name_category),
    constraint est_un_ibfk_2
        foreign key (id_ebook) references Ebook (id_ebook)
);

create index id_ebook
    on est_un (id_ebook);

create table favoris
(
    mail_Clients varchar(250) default '' not null,
    id_ebook     bigint       default 0  not null,
    primary key (mail_Clients, id_ebook),
    constraint favoris_ibfk_1
        foreign key (mail_Clients) references Clients (mail_Clients),
    constraint favoris_ibfk_2
        foreign key (id_ebook) references Ebook (id_ebook)
);

create index id_ebook
    on favoris (id_ebook);

create table parle_de
(
    id_ebook   bigint      default 0  not null,
    name_theme varchar(50) default '' not null,
    primary key (id_ebook, name_theme),
    constraint parle_de_ibfk_1
        foreign key (id_ebook) references Ebook (id_ebook),
    constraint parle_de_ibfk_2
        foreign key (name_theme) references Theme (name_theme)
);

create index name_theme
    on parle_de (name_theme);

create table partager
(
    mail_Clients      varchar(250) default '' not null,
    mail_Clients_dest varchar(250) default '' not null,
    id_ebook          bigint       default 0  not null,
    primary key (mail_Clients, mail_Clients_dest, id_ebook),
    constraint partager_ibfk_1
        foreign key (mail_Clients) references Clients (mail_Clients),
    constraint partager_ibfk_2
        foreign key (mail_Clients_dest) references Clients (mail_Clients),
    constraint partager_ibfk_3
        foreign key (id_ebook) references Ebook (id_ebook)
);

create index id_ebook
    on partager (id_ebook);

create index mail_Clients_dest
    on partager (mail_Clients_dest);

