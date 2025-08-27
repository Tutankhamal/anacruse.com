# Script para adicionar favicon em todas as páginas HTML
$faviconLine = '  <link rel="icon" type="image/x-icon" href="../assets/images/favicon.ico">'
$rootFaviconLine = '  <link rel="icon" type="image/x-icon" href="./assets/images/favicon.ico">'

# Lista de arquivos HTML
$htmlFiles = @(
    'eng\about.html',
    'eng\band.html', 
    'eng\channel.html',
    'eng\contact.html',
    'eng\store.html',
    'ptbr\banda.html',
    'ptbr\canal.html',
    'ptbr\contato.html',
    'ptbr\loja.html',
    'ptbr\sobre.html',
    'index.html'
)

foreach ($file in $htmlFiles) {
    $fullPath = "d:\Desktop\Afonso Fonseca\$file"
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw
        
        # Verifica se já tem favicon
        if ($content -notmatch 'favicon\.ico') {
            # Determina qual linha de favicon usar
            $lineToAdd = if ($file -eq 'index.html') { $rootFaviconLine } else { $faviconLine }
            
            # Adiciona favicon após og:image
            $content = $content -replace '(\s*<meta property="og:image" content="" />)', "`$1`n$lineToAdd"
            
            # Salva o arquivo
            Set-Content -Path $fullPath -Value $content -NoNewline
            Write-Host "Favicon adicionado em: $file"
        } else {
            Write-Host "Favicon já existe em: $file"
        }
    } else {
        Write-Host "Arquivo não encontrado: $file"
    }
}

Write-Host "Script concluído!"