<?php
    function calculateDeposit($sum, $months, $percent) {
        $profit = $sum * ($percent / 100) * ($months / 12);
        return $sum + $profit;
    };

    echo calculateDeposit(36000, 6, 12);
?>