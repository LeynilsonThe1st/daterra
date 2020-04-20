<?php header("Access-Control-Allow-Origin: *");

$nome = $_REQUEST["nome"] ?? " ";
$email = $_REQUEST["email"] ?? " ";
$pacote = (string) $_REQUEST["pacote"] - 1;
$descricao = $_REQUEST["descricao"] ?? " ";
$cod_servico = $_REQUEST["cod-servico"];

$pacotes = [
  "1" => ["pacotes b", "pacote b", "pacote C"],
  "2" => ["pacotes 1", "pacote 2", "pacote 3"],
  "3" => ["pacotes bronze", "pacote silver", "pacote gold"],
  "4" => ["pacotes free", "pacote promo", "pacote member"],
  "5" => ["pacotes small", "pacote medium", "pacote big"],
  "6" => ["pacotes s", "pacote m", "pacote l", "pacote xl"]
];

$servicos = [
  "1" => "Carregamento Net Teller",
  "2" => "Compras Online",
  "3" => "Pagamento Netflix",
  "4" => "Gift Cards Variados",
  "5" => "Pagamento de dívidas online em dólar e euro",
  "6" => "Pagamento Spotify"
];

if (!isset($pacote) || !isset($pacote)) {
    $msg = "Seleccione o um pacote";
} else {
    $msg = "O seu pedido para {$servicos[$cod_servico]}
    com o pacote {$pacotes[$cod_servico][$pacote]} foi bem sucedido";
}

$resposta = [
  "msg" => $msg,
  "servico" => $cod_servico
];

$num = 0;
while ($num <= 100000000) {
  $num += 1;
}

echo json_encode($resposta);
