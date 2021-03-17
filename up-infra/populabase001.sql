INSERT INTO Up_TipoUsuario (Nom_TipoUsuario)
	VALUES 
		('Administrador'),
		('Desenvolvedor'),
		('Cliente');

INSERT INTO Up_Usuario (Nom_Nome, Nom_Login, Nom_Senha, Cod_TipoUsuario)
	VALUES
		('Administrador', 'admin', 'admin', '1'),
		('Dev1', 'D1', '123', '2'),
		('Dev2', 'D2', '123', '2'),
		('Dev3', 'D3', '123', '2'),
		('Cliente1', 'C1', '123', '3'),
		('Cliente2', 'C2', '123', '3'),
		('Cliente3', 'C3', '123', '3');

INSERT INTO Up_Genero (Nom_Genero)
	VALUES
		('Aventura'),
		('Acao'),
		('Tabuleiro'),
		('Tiro em Primeira Pessoa'),
		('Casual'),
		('Terror');

INSERT INTO Up_Jogo (Nom_Nome, Cod_Genero, Vlr_Preco)
	VALUES
		('Rei Arthur', '1', '49.90'),
		('Resident Evil', '6', '49.90'),
		('Counter-Strike', '4', '49.90'),
		('Catan', '3', '49.90'),
		('Minecraft', '5', '49.90'),
		('Monopoly', '3', '49.90'),
		('Hitman', '2', '49.90');
		
INSERT INTO Up_Carteira (Vlr_Saldo, Cod_Usuario)
	VALUES
		(0.0, 5),
		(0.0, 6),
		(0.0, 7);
			