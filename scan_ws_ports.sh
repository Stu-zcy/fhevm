#!/bin/bash

# 使用方法:
# ./scan_ws_ports.sh <IP> [start_port] [end_port]
# 默认扫描 1~65535 端口

if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <IP> [start_port] [end_port]"
    exit 1
fi

IP=$1
START_PORT=${2:-1}
END_PORT=${3:-65535}

echo "Scanning WebSocket ports on $IP from $START_PORT to $END_PORT ..."

MAX_JOBS=50   # 并行请求数量，防止网络炸掉
CURRENT_JOBS=0

for PORT in $(seq $START_PORT $END_PORT); do
    (
        STATUS=$(curl -s -i -N \
            -H "Connection: Upgrade" \
            -H "Upgrade: websocket" \
            -H "Host: $IP:$PORT" \
            -H "Origin: http://localhost" \
            http://$IP:$PORT 2>/dev/null | head -n 1)

        if [[ $STATUS == *"101 Switching Protocols"* ]]; then
            echo "✅ $PORT is a valid WebSocket"
        fi
    ) &

    CURRENT_JOBS=$((CURRENT_JOBS + 1))
    if [ "$CURRENT_JOBS" -ge "$MAX_JOBS" ]; then
        wait
        CURRENT_JOBS=0
    fi
done

# 等待所有后台进程完成
wait

echo "Scan complete."
