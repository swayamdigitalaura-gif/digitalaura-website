<?php
// Forward all /api/* requests to Node.js backend on port 5002
$path = isset($_GET['__path']) ? $_GET['__path'] : '';
$qs = $_SERVER['QUERY_STRING'];
// Remove __path= from query string
$qs = preg_replace('/(^|&)__path=[^&]*(&|$)/', '$2', $qs);
$qs = ltrim($qs, '&');

$url = 'http://127.0.0.1:5002/api/' . ltrim($path, '/');
if ($qs) $url .= '?' . $qs;

// Collect headers to forward
$headers = [];
foreach (getallheaders() as $name => $value) {
  $lower = strtolower($name);
  if (in_array($lower, ['host', 'connection', 'content-length'])) continue;
  $headers[] = "$name: $value";
}

$method = $_SERVER['REQUEST_METHOD'];
$body = file_get_contents('php://input');

$ch = curl_init();
curl_setopt_array($ch, [
  CURLOPT_URL            => $url,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST  => $method,
  CURLOPT_HTTPHEADER     => $headers,
  CURLOPT_POSTFIELDS     => ($body !== false && strlen($body) > 0) ? $body : null,
  CURLOPT_TIMEOUT        => 30,
  CURLOPT_FOLLOWLOCATION => false,
  CURLOPT_HEADER         => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$curlErr = curl_error($ch);
curl_close($ch);

if ($curlErr || $response === false) {
  http_response_code(503);
  header('Content-Type: application/json');
  echo json_encode(['success' => false, 'message' => 'API backend unavailable']);
  exit;
}

// Parse response headers and body
$responseHeaders = substr($response, 0, $headerSize);
$responseBody    = substr($response, $headerSize);

http_response_code($httpCode);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Forward relevant headers
foreach (explode("\r\n", $responseHeaders) as $line) {
  if (preg_match('/^(Content-Type|Content-Disposition):\s*(.+)/i', $line, $m)) {
    header($line);
  }
}

echo $responseBody;
