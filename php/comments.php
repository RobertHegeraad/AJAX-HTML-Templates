<?php

// Get comments from a database

// Return the comments
echo json_encode(array(
   array('username' => 'User 1', 'comment' => 'Comment 1', 'profile_image' => 'img/user.jpg'),
   array('username' => 'User 2', 'comment' => 'Comment 2', 'profile_image' => 'img/user.jpg'),
   array('username' => 'User 3', 'comment' => 'Comment 3', 'profile_image' => 'img/user.jpg')
));