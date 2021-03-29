# Chia Desktop

A chia desktop dashboard build on the [Chia](https://www.chia.net/) RPC interface.

<img src="https://github.com/Flofie/chia-desktop/blob/main/desktop.png?raw=true" width="700" />
<img src="https://github.com/Flofie/chia-desktop/blob/main/mobile.png?raw=true" width="200" />

### Getting started

Since the communication with the Chia RPC inteface is encrypted we need the certificates for the services. The certificate is never transfered, it is only needed to access the RPC interface.
Under Linux you can view the certificate via:

```
cat ~/.chia/mainnet/config/ssl/[service]/[service].crt
cat ~/.chia/mainnet/config/ssl/[service]/[service].key
```

### Remote machine

If you run **chia desktop** on another machine then your chia client, you need to connect via local Network to the chia RPC service. You need to change the configuration in config.yaml to bind to the **local** IP-Address instead of localhost.

**WARNING: Never expose your RPC interface publicly.**

```
- self_hostname: localhost
+ self_hostname: 192.168.2.100 (local IP-Adress)
```

### Run the server

1. install dependencies

```
npm i
```

2. start the server

```
npm run start
```

if you want to run the server on another port then 8080 use the following command

```
PORT=1337 npm run start
```

3. open in browser: [(http://localhost:8080](http://localhost:8080)
