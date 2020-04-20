<?php header("Access-Control-Allow-Origin: *");

$cod_servico = $_REQUEST["cod-servico"] ?? "1";

$pacotes = [
  "1" => ["pacotes b", "pacote b", "pacote C"],
  "2" => ["pacotes 1", "pacote 2", "pacote 3"],
  "3" => ["pacotes bronze", "pacote silver", "pacote gold"],
  "4" => ["pacotes free", "pacote promo", "pacote member"],
  "5" => ["pacotes small", "pacote medium", "pacote big"],
  "6" => ["pacotes s", "pacote m", "pacote l", "pacote xl"],
];


$resposta = [
  "pacotes" => $pacotes[$cod_servico]
];

$num = 0;
while ($num <= 100000000) {
  $num += 1;
}

echo json_encode($resposta);
