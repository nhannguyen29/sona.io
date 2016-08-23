# Creat Users Table
```
CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  first_name varchar(20) DEFAULT NULL,
  last_name varchar(20) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  username varchar(100) DEFAULT NULL,
  password varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8
```

# Create Songs Table
```
CREATE TABLE songs (
  id int(11) NOT NULL AUTO_INCREMENT,
  song_name varchar(50) NOT NULL,
  user_id int(11) NOT NULL,
  url varchar(255) NOT NULL,
  uploadedDate datetime DEFAULT NULL,
  PRIMARY KEY (id),
  KEY user_id (user_id),
  CONSTRAINT songs_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8
```