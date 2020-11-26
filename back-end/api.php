<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$route = getenv('PATH_INFO') ?? '/';

if ($route === '/colunas') {
    $colunas['colunas'] = [];

    try {
        $conn = new PDO(
            'mysql:host=localhost;dbname=funil', 'root', ''
        );
    } catch (PDOException $e) {
        $colunas['erro'] = true;
        echo json_encode($colunas);
        exit();
    }

    $cols = $conn->query("SELECT * FROM colunas WHERE status = 1 ORDER BY ordem ASC");

    foreach ($cols as $col) {
        $query = $conn->prepare("SELECT * FROM coluna_item WHERE coluna = ? AND status = 1 ORDER BY ordem ASC");
        $query->execute([$col['id']]);

        $itens = [];

        while ($item = $query->fetch()) {
            $itens[] = [
                'id' => $item['id'],
                'descricao' => $item['descricao'],
                'ordem' => $item['ordem']
            ];
        }

        $colunas['colunas'][] = 
        array(
            'id' => $col['id'],
            'descricao' => $col['descricao'],
            'itens' => $itens
        );
    }

    echo json_encode($colunas);
}

if ($route === '/drop' && 'POST' === getenv('REQUEST_METHOD')) {
    $json = json_decode(file_get_contents('php://input'));

    $vars = [
        'erro' => false,
        'item' => filter_var($json->item, FILTER_VALIDATE_INT),
        'coluna' => filter_var($json->colunaAlvo, FILTER_VALIDATE_INT),
        'colunaOrigem' => filter_var($json->colunaOrigem, FILTER_VALIDATE_INT),
        'ordem' => filter_var($json->ordem, FILTER_VALIDATE_INT),
    ];


    try {
        $conn = new PDO(
            'mysql:host=localhost;dbname=funil', 'root', ''
        );
    } catch (PDOException $e) {
        $vars['erro'] = true;
        echo json_encode($vars);
        exit();
    }

    if ($vars['ordem'] === 0) {
        $query = $conn->prepare("SELECT * FROM coluna_item WHERE coluna = ? AND status = 1 ORDER BY ordem DESC LIMIT 1");
        $query->execute([$vars['coluna']]);

        $vars['ordem'] = $query->fetch()['ordem'] + 1;
    } else {
        $query = $conn->prepare("SELECT * FROM coluna_item WHERE coluna = ? AND status = 1 AND ordem >= ? ORDER BY ordem ASC");
        $query->execute([$vars['coluna'], $vars['ordem']]);

        while ($item = $query->fetch()) {
            $query2 = $conn->prepare("UPDATE coluna_item SET ordem = ?, coluna = ? WHERE id = ?");
            $query2->execute([($item['ordem'] + 1), $item['coluna'], $item['id']]);
        }
    }

    if ($vars['ordem'] === 1) {
        $query = $conn->prepare("SELECT * FROM coluna_item WHERE coluna = ? AND status = 1 AND ordem >= ? ORDER BY ordem ASC");
        $query->execute([$vars['colunaOrigem'], $vars['ordem']]);

        while ($item = $query->fetch()) {
            $query2 = $conn->prepare("UPDATE coluna_item SET ordem = ?, coluna = ? WHERE id = ?");
            $query2->execute([($item['ordem'] - 1), $item['coluna'], $item['id']]);
        }
    }
    try {
        $query = $conn->prepare("UPDATE coluna_item SET ordem = ?, coluna = ? WHERE id = ?");
        $query->execute([$vars['ordem'], $vars['coluna'], $vars['item']]);
    } catch (PDOException $e) {
        $vars['erro'] = true;
        echo json_encode($vars);
        exit();
    }

    echo json_encode($vars);
}
?>