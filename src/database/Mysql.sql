CREATE DATABASE Filmes_DB;

USE Filmes_DB;

create table Users(
    Id varchar(30) primary key not null,
    Image varchar(200) not null,
    Name varchar(65) UNIQUE not null,
    Email varchar(80) UNIQUE not null,
    Password varchar(300) not null,
    Created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

create table Movies(
    UserId varchar(30) not null,
    Id varchar(30) primary key not null,
    ImgName varchar(200) not null,
    Synopsis varchar(1000) not null,
    Genre varchar(20) not null,
    Title varchar(35) not null,
    DayMonthYear varchar(12) not null,
    CONSTRAINT FK_UserId foreign key (UserId) references Users (Id),
    Created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

create table Comments(
    Id varchar(30) primary key not null,
    UserId varchar(30) not null,
    MovieId varchar(30) not null,
    Comment varchar(200) not null,
    Note int(2) not null,
    CONSTRAINT FK_UserIdComment foreign key (UserId) references Users (Id),
    CONSTRAINT FK_MovieId foreign key (MovieId) references Movies (Id)
);