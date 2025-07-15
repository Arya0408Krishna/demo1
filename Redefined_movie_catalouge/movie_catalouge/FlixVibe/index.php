<?php
include("connection.php"); ?>
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Login - FlixVibe</title>
 <link rel="stylesheet" type="text/css" href="style1.css">
</head>
<body>
 <header>
 <div class="logo-container">
 <h1 class="flixvibe-header">FlixVibe</h1>
 </div>
 </header>
 <main class="login-container">
 <div id="form">
 <form action="loginp.php" name="form" onsubmit="return isvalid()" method="POST">
 <label for="username">Username:</label>
 <input type="text" id="user" name="user"><br><br>

 <label for="password">Password:</label>
 <input type="password" id="pass" name="pass"><br><br>
 <input type="submit" id="btn" value="Login" name="submit"/>
 </form>
 </div>
 <script>
 function isvalid(){
 var user=document.form.user.value;
 var pass=document.form.pass.value;
 if(user.length=="" && pass.length==""){
 alert("Username and password field is empty!!!");
 return false;
 } else {
 if(user.length==""){
 alert("Username field is empty!!!");
 return false;
 }
 if(pass.length==""){
 alert("Password field is empty!!!");
 return false;
 }
 } }
 </script>
</body>
</html>
