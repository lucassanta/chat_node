-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 04/04/2020 às 21:07
-- Versão do servidor: 5.7.29-0ubuntu0.18.04.1
-- Versão do PHP: 7.2.24-0ubuntu0.18.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `chat`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `message`
--

CREATE TABLE `message` (
  `messageID` bigint(20) NOT NULL,
  `messageChatID` bigint(20) DEFAULT NULL,
  `messageText` varchar(200) DEFAULT NULL,
  `mesageSenderID` bigint(20) DEFAULT NULL,
  `messageReceiverID` bigint(20) DEFAULT NULL,
  `messageSendAt` datetime DEFAULT NULL,
  `messageReadAt` datetime DEFAULT NULL,
  `messageStatustiny` int(1) DEFAULT NULL,
  `messageVisibilitytiny` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `status` int(1) NOT NULL,
  `telefone` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Fazendo dump de dados para tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`, `status`, `telefone`) VALUES
(3, 'João', 'lps@live.com', '1233', 1, NULL),
(4, 'Fred', 'ok@live.com', '123333', 1, NULL),
(5, 'lucas', 'lucas', 'lucas', 1, NULL),
(6, 'Victor', 'email@email.com', '123', 1, '983190116'),
(7, 'Davi', 'davi@davi.com', '', 1, '75983190116'),
(8, 'rafa', 'rafa@rafa.com', '', 1, '983190116'),
(9, 'André', 'op@op.com', '$2a$10$e4CSk12lv5jvhLAVkw0gNO2lKH0fSDw9eIffIp5Lyfk7oUJBP.2DS', 1, '983190116'),
(10, 'Ana', 'ana@ana.com', '$2a$10$CSU1qNnWdayEKf48Aies9.B.rphgECNN4fmGYNtx.9uCHgOhSfnMG', 1, '983190116'),
(11, 'Vini', 'Vinicius.melo@huggy.io', '$2a$10$juqjdsDIEXQLoZOXz66oeeJOOaJOYmgeHloO1.L8wa1gUEGaS/pAW', 1, '983190116');

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`messageID`),
  ADD KEY `mesageSenderID` (`mesageSenderID`),
  ADD KEY `messageReceiverID` (`messageReceiverID`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `message`
--
ALTER TABLE `message`
  MODIFY `messageID` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`mesageSenderID`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`messageReceiverID`) REFERENCES `usuario` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
