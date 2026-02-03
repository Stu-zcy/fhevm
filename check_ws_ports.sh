#!/bin/bash

# 使用方法:
# ./check_ws_ports.sh 8.152.202.58 32769 32770 32771
# 第一个参数是 IP，后面是要检测的端口列表

if [ "$#" -lt 2 ]; then
    echo "Usage: $0 <IP> <port1> [port2 ...]"
    exit 1
fi

IP=$1
shift
PORTS=("$@")

echo "Checking WebSocket ports on $IP ..."

for PORT in "${PORTS[@]}"; do
    # 发起 HTTP Upgrade 请求检查 WebSocket
    STATUS=$(curl -s -i -N \
        -H "Connection: Upgrade" \
        -H "Upgrade: websocket" \
        -H "Host: $IP:$PORT" \
        -H "Origin: http://localhost" \
        http://$IP:$PORT 2>/dev/null | head -n 1)

    if [[ $STATUS == *"101 Switching Protocols"* ]]; then
        echo "✅ Port $PORT is a valid WebSocket"
    elif [[ $STATUS == *"200 OK"* ]]; then
        echo "❌ Port $PORT responded HTTP 200, not WebSocket"
    else
        echo "❌ Port $PORT not reachable or unexpected response"
    fi
done
