CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL,
   PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



CREATE TABLE `teams` (
  `team_id` int(11) NOT NULL AUTO_INCREMENT,
  `teamName` varchar(50) NOT NULL,
  `member_id` int(11) NOT NULL,
  `captain_id` int(11) NOT NULL,
  `durum` boolean NOT NULL,
  PRIMARY KEY (team_id)
  CONSTRAINT member_id FOREIGN KEY (member_id) REFERENCES users(user_id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `tasks` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `task` varchar(100) NOT NULL,
  'user_id' int(11) NOT NULL,
  `team_id` varchar(11) NULL,
  `uye_id` int(11) NULL,
  'checked' boolean NOT NULL,

  PRIMARY KEY (task_id)
  CONSTRAINT team_id FOREIGN KEY (team_id) REFERENCES teams(team_id),
  CONSTRAINT uye_id FOREIGN KEY (uye_id) REFERENCES teams(member_id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;



