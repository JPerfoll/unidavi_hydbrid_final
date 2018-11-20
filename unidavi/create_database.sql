-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 20-Nov-2018 às 00:15
-- Versão do servidor: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ionic`
--
CREATE DATABASE IF NOT EXISTS `ionic` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `ionic`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `professor`
--

CREATE TABLE IF NOT EXISTS `professor` (
`id` int(11) NOT NULL,
  `nome` varchar(240) NOT NULL,
  `nascimento` date DEFAULT NULL,
  `foto` text,
  `curriculo` varchar(3000) DEFAULT NULL,
  `status` char(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `professor`
--

INSERT INTO `professor` (`id`, `nome`, `nascimento`, `foto`, `curriculo`, `status`) VALUES
(1, 'JOSÉ DA SILVA', '2016-01-01', '', '', '1'),
(2, 'LILIETE ABREU BOREIA', '2003-01-03', '', '', '1'),
(3, 'NEREU DA SILVA ALVES', '2003-03-01', '', '', '1'),
(4, 'DANIELA', '2015-01-01', '', '', '1'),
(5, 'PATRICIA', '2015-12-05', '', '', '1'),
(6, 'RODINEI DE MELLO', '2000-10-01', '', '', '1'),
(7, 'ANA PAULA', '2016-01-01', '', '', '1'),
(8, 'TATIANA DAVILA', '2016-06-01', '', '', '1'),
(9, 'PAULA ROSA DA SILVA', '2014-08-11', '', '', '1'),
(10, 'ROBSON FABIANO CHERVINI', '2014-12-02', '', '', '1'),
(11, 'RICARDO TOLARDO RIBEIRO', '2000-12-01', '', '', '1'),
(12, 'GIOVANI', '2010-01-01', '', '', '1'),
(13, 'JOSE CARLOS MACHADO', '2002-11-05', '', '', '1'),
(14, 'VILMAR LUIZ DA CUNHA', '2003-08-04', '', '', '1'),
(15, 'PRISCILA ANDRADE BALDO', '2004-06-21', '', '', '1'),
(16, 'OSNI KRATZ', '2004-08-01', '', '', '1'),
(17, 'MOACIR BOSSI', '2005-03-14', '', '', '1'),
(18, 'ANTENIR CARLOS BELMIRO DA SILVA', '2005-04-01', '', '', '1'),
(19, 'SIVANARA DE ALBUQUERQUE FROHLICH', '2005-06-21', '', '', '1'),
(20, 'VALDEMIRO MACHADO', '2005-08-02', '', '', '1'),
(21, 'ROGERIO ANDRADE', '2005-11-03', '', '', '1'),
(22, 'MARIA ADRIANA ALVES', '2006-02-01', '', '', '1'),
(23, 'FABIO MAENNCHEN', '2006-11-13', '', '', '1'),
(24, 'ELIANA BRUNING', '2007-02-02', '', '', '1'),
(25, 'MARLENE KALBUSCH', '2007-07-23', '', '', '1'),
(26, 'VANUSA GUIZONI BETT', '2008-09-25', '', '', '1'),
(27, 'NELSON SOUZA DOS SANTOS', '2008-11-01', '', '', '1'),
(28, 'KARINA CARLA KOPSSELL', '2009-02-04', '', '', '1'),
(29, 'FABIO LUIZ GONCALVES', '2009-03-02', '', '', '1'),
(30, 'MARLI SCHAFER', '2009-04-01', '', '', '1'),
(31, 'ELISABETH REGINA KLING', '2009-11-30', '', '', '1'),
(32, 'LUCIANO DOS SANTOS', '2010-02-01', '', '', '1'),
(33, 'ROSANA PITZ', '2010-08-26', '', '', '1'),
(34, 'ROSEMERI ROSELI DATSCH LANGE', '2010-08-23', '', '', '1'),
(35, 'LUCIA TEODORO DA SILVA GONCALVES', '2010-08-30', '', '', '1'),
(36, 'MARCIO JOSE NEREU DA ROCHA', '2011-01-04', '', '', '1'),
(37, 'ARMELINDO BONATTI', '2011-04-01', '', '', '1'),
(38, 'JAKSON LUIZ MALIUK', '2011-04-01', '', '', '1'),
(39, 'DOMINGOS MANNCHEN', '2011-05-02', '', '', '1'),
(40, 'ADRIANO LENZI', '2004-05-03', '', '', '1'),
(41, 'ALCIDES FOGULAR', '2005-02-01', '', '', '1'),
(42, 'AMARILDO JOSE DA CUNHA', '2010-04-16', '', '', '1'),
(43, 'GIOVANE LADISLAU TRAVASSO', '2004-05-03', '', '', '1'),
(44, 'LUIZ ANTONIO HOFFMANN', '2006-06-01', '', '', '1'),
(45, 'MARCELO RENKEN', '2010-01-15', '', '', '1'),
(46, 'MARCIO LUIS BIERMEIER', '2004-10-13', '', '', '1'),
(47, 'RODNEI SOARES DA VEIGA', '2005-04-02', '', '', '1'),
(48, 'SANDRO DE SOUZA BREHM', '2008-07-01', '', '', '1'),
(49, 'RUBENS RICARDO PUKALL', '2010-07-07', '', '', '1'),
(50, 'ALVADIR CARLOS ISGANZELLA', '2011-06-20', '', '', '1'),
(51, 'ADRIANO IMA', '1993-04-19', '', '', '1'),
(52, 'LAURA CRISTINA PERFOLL', '2009-02-07', '', '', '0');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
`id` int(11) NOT NULL,
  `login` varchar(150) NOT NULL,
  `senha` varchar(150) NOT NULL,
  `email` varchar(250) NOT NULL,
  `nome` varchar(240) NOT NULL,
  `idioma` varchar(15) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `login`, `senha`, `email`, `nome`, `idioma`) VALUES
(1, 'zaedy', 'z123y', 'zaedy@unidavi.edu.br', 'Zaedy', 'en'),
(4, 'jean', 'j123n', 'jeanperfoll@unidavi.edu.br', 'Jean', 'en');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `professor`
--
ALTER TABLE `professor`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `professor`
--
ALTER TABLE `professor`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
