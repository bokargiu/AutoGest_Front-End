# AutoGestFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development Server

#### Passo 1
  Alterar a baseApi para:

    http://localhost:5169
    
#### Passo 2
  Ir no index.html e alterar de <base href="/autogest/"> para <base href="/">
  
#### Passo 3
  Execute o comando `ng serve` para iniciar um servidor de desenvolvimento. Acesse `http://localhost:4200/`. O aplicativo será recarregado automaticamente se você alterar algum dos arquivos de origem.

## Development Docker Server

#### Passo 1
  Alterar a baseApi para:

    http://localhost:5169
    
#### Passo 2
  Baixar e instalar o Nginx
  
#### Passo 3
  Configurar o Nginx da seguinte forma:
    
    events{
  
    }
    http{
    
        server{
            listen 80;
            server_name localhost;
    
            location /autogest/ {
                proxy_pass http://localhost:4200/;
            }
    
            location /autogest/api/ {
                proxy_pass http://localhost:5169/;
            }
        }
    }
  
