<?php header("Access-Control-Allow-Origin: *");

$moeda1 = $_REQUEST["moeda1"] ?? "Dolar";
$moeda2 = $_REQUEST["moeda2"] ?? "Kwanza";
$preco =  $_REQUEST["preco"] ?? 20;

$num = 0;
while ($num <= 100000000) {
  $num += 1;
}

$texto = "moeda1 = " . $moeda1 . " | moeda2 = " . $moeda2 . " | preco = " . $preco;
$resposta = [
  "resultato" => $preco * 500,
  "texto" => "Teste - $texto"
];

echo json_encode($resposta);

?>
