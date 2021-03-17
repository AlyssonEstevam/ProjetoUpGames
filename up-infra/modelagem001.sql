CREATE DATABASE projetoupgames;

USE projetoupgames;

CREATE TABLE Up_TipoUsuario(
	Cod_SeqTipoUsuario int AUTO_INCREMENT NOT NULL,
	Nom_TipoUsuario varchar(50),
	PRIMARY KEY (Cod_SeqTipoUsuario)
);

CREATE TABLE Up_Usuario(
	Cod_SeqUsuario int AUTO_INCREMENT NOT NULL,
	Nom_Nome varchar(100),
	Nom_Login varchar(30),
	Nom_Senha varchar(20),
	Cod_TipoUsuario int NOT NULL,
	PRIMARY KEY (Cod_SeqUsuario),
	CONSTRAINT Cod_TipoUsuario_FK FOREIGN KEY (Cod_TipoUsuario) 
	REFERENCES Up_TipoUsuario(Cod_SeqTipoUsuario)
);

CREATE TABLE Up_Genero(
	Cod_SeqGenero int AUTO_INCREMENT NOT NULL,
	Nom_Genero varchar(50),
	PRIMARY KEY (Cod_SeqGenero)
);

CREATE TABLE Up_Jogo(
	Cod_SeqJogo int AUTO_INCREMENT NOT NULL,
	Nom_Nome varchar(100),
	Cod_Genero int NOT NULL,
	Vlr_Preco float,
	PRIMARY KEY (Cod_SeqJogo),
	CONSTRAINT Cod_Genero_FK FOREIGN KEY (Cod_Genero) 
	REFERENCES Up_Genero(Cod_SeqGenero)
);

CREATE TABLE Up_Carteira(
	Cod_SeqCarteira int AUTO_INCREMENT NOT NULL,
	Vlr_Saldo float NOT NULL,
	Cod_Usuario int NOT NULL,
	PRIMARY KEY (Cod_SeqCarteira),
	CONSTRAINT Cod_Usuario_FK FOREIGN KEY (Cod_Usuario)
	REFERENCES Up_Usuario(Cod_SeqUsuario)
);

CREATE TABLE Up_ControleVenda(
	Cod_SeqControleVenda int AUTO_INCREMENT NOT NULL,
	Cod_Usuario int NOT NULL,
	Ind_HorizonCarrinho int NOT NULL,
	Ind_FarCryCarrinho int NOT NULL,
	Ind_HorizonConfirmaVenda int NOT NULL,
	Ind_FarCryConfirmaVenda int NOT NULL,
	PRIMARY KEY (Cod_SeqControleVenda),
	CONSTRAINT Cod_Usuario_FK1 FOREIGN KEY (Cod_Usuario)
	REFERENCES Up_Usuario(Cod_SeqUsuario)
);
