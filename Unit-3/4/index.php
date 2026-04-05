<?php
    $uploadDir = 'uploads/';

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $uploadError = '';
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['photo'];
        $fileName = basename($file['name']);
        
        $extension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        
        $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        

        if (in_array($extension, $allowedExtensions) && in_array($mimeType, $allowedMimeTypes)) {
            $uniqueName = time() . '_' . uniqid() . '.' . $extension;
            $targetPath = $uploadDir . $uniqueName;
            
            if (move_uploaded_file($file['tmp_name'], $targetPath)) {
                header("Location: " . $_SERVER['PHP_SELF']);
                exit;
            } else {
                $uploadError = "Ошибка при перемещении файла!";
            }
        } else {
            $uploadError = "Можно загружать только изображения (JPG, PNG, GIF, WEBP)!";
        }
    } elseif (isset($_FILES['photo']) && $_FILES['photo']['error'] !== UPLOAD_ERR_NO_FILE) {
        switch ($_FILES['photo']['error']) {
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                $uploadError = "Файл слишком большой!";
                break;
            default:
                $uploadError = "Ошибка при загрузке файла!";
        }
    }

    $images = [];
    if (is_dir($uploadDir)) {
        $files = scandir($uploadDir);
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..') {
                $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                if (in_array($extension, $allowedExtensions)) {
                    $images[] = $file;
                }
            }
        }
        
        usort($images, function($a, $b) use ($uploadDir) {
            return filemtime($uploadDir . $b) - filemtime($uploadDir . $a);
        });
    }
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Моя Фотогалерея</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f0f0f0;
        }
        
        h1 {
            text-align: center;
            color: #333;
        }
        
        .upload-form {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .upload-form input[type="file"] {
            margin-right: 10px;
            padding: 10px;
        }
        
        .upload-form button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        
        .upload-form button:hover {
            background: #45a049;
        }
        
        .success {
            background: #4CAF50;
            color: white;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .gallery-item {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        
        .gallery-item:hover {
            transform: translateY(-5px);
        }
        
        .gallery-item img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            display: block;
        }
        
        .gallery-item .info {
            padding: 10px;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
        
        .empty-gallery {
            text-align: center;
            padding: 50px;
            background: white;
            border-radius: 8px;
            color: #666;
        }
        
        .stats {
            text-align: center;
            margin-bottom: 20px;
            color: #666;
        }
    </style>
</head>
<body>
    <h1>Моя Фотогалерея</h1>
    <div class="upload-form">
        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data">
            <input type="file" name="photo" accept="image/*" required>
            <button type="submit">Загрузить фото</button>
        </form>
    </div>
    <div class="stats">
        Всего фото: <?php echo count($images); ?>
    </div>
    
    <?php if (count($images) > 0): ?>
        <div class="gallery">
            <?php foreach ($images as $img): ?>
                <div class="gallery-item">
                    <img src="<?php echo $uploadDir . urlencode($img); ?>" alt="<?php echo htmlspecialchars($img); ?>">
                    <div class="info">
                        <?php 
                        $filePath = $uploadDir . $img;
                        $fileSize = filesize($filePath);
                        $sizeMB = round($fileSize / 1024 / 1024, 2);
                        echo htmlspecialchars($img) . '<br>(' . $sizeMB . ' MB)';
                        ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    <?php else: ?>
        <div class="empty-gallery">
            <p>Галерея пуста</p>
            <p>Загрузите первые фото с помощью формы выше!</p>
        </div>
    <?php endif; ?>
</body>
</html>