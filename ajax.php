<?php
$client = new SoapClient('https://api.forum-auto.ru/wsdl', ["exceptions" => false]);
$login = '493358_stroyzar';
$pass = 'sAVDkrEbqd';
$article = $_POST['article'];

$result = $client->listGoods($login, $pass, $article);

if (is_soap_fault($result)) {
    // надо сделать обработку ошибки ((
    echo "SOAP Fault: (faultcode: {$result->faultcode}, faultstring: {$result->faultstring}, detail: {$result->detail})";

} else {
    header('Content-type: application/json');
    echo json_encode($result);
}
