
### **2. `database.php` (MySQL Connection)**
```php
<?php
$host = 'localhost';
$dbname = 'react_auth';
$username = 'root';
$password = ''; // Default XAMPP MySQL password is blank

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>