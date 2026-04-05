<?php
    $result = '';
    $num1 = '';
    $num2 = '';
    $operation = '';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $num1 = $_POST['num1'] ?? '';
        $num2 = $_POST['num2'] ?? '';
        $operation = $_POST['operation'] ?? '';
        
        // Проверяем, что оба поля не пустые и являются числами
        if (is_numeric($num1) && is_numeric($num2)) {
            $num1 = (float)$num1;
            $num2 = (float)$num2;
            
            switch ($operation) {
                case '+':
                    $result = $num1 + $num2;
                    break;
                case '-':
                    $result = $num1 - $num2;
                    break;
                case '*':
                    $result = $num1 * $num2;
                    break;
                case '/':
                    if ($num2 != 0) {
                        $result = $num1 / $num2;
                    } else {
                        $result = 'Ошибка: деление на ноль!';
                    }
                    break;
                default:
                    $result = 'Выберите операцию';
            }
        } else {
            $result = 'Ошибка: введите корректные числа';
        }
    }
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Простейший калькулятор</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
        }
        .calculator {
            background: #f4f4f4;
            padding: 20px;
            border-radius: 5px;
        }
        input, select, button {
            margin: 10px 0;
            padding: 8px;
            font-size: 16px;
        }
        input {
            width: 100%;
            box-sizing: border-box;
        }
        select {
            width: 100%;
        }
        button {
            background: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
            width: 100%;
        }
        button:hover {
            background: #45a049;
        }
        .result {
            margin-top: 20px;
            padding: 10px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 3px;
            font-size: 18px;
            font-weight: bold;
        }
        h2 {
            text-align: center;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="calculator">
        <h2>Калькулятор</h2>
        <form method="post">
            <input type="text" name="num1" value="<?php echo htmlspecialchars($num1); ?>" 
                   placeholder="Введите первое число" required>
            
            <select name="operation">
                <option value="+" <?php echo $operation == '+' ? 'selected' : ''; ?>>+</option>
                <option value="-" <?php echo $operation == '-' ? 'selected' : ''; ?>>-</option>
                <option value="*" <?php echo $operation == '*' ? 'selected' : ''; ?>>*</option>
                <option value="/" <?php echo $operation == '/' ? 'selected' : ''; ?>>/</option>
            </select>
            
            <input type="text" name="num2" value="<?php echo htmlspecialchars($num2); ?>" 
                   placeholder="Введите второе число" required>
            
            <button type="submit">Вычислить</button>
        </form>
        
        <?php if ($result !== ''): ?>
        <div class="result">
            Результат: <?php echo htmlspecialchars($result); ?>
        </div>
        <?php endif; ?>
    </div>
</body>
</html>