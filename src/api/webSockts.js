class WebSocketClient {
  constructor(url, options = {}) {
    this.url = url;
    this.ws = null;
    this.reconnectInterval = options.reconnectInterval || 5000;
    this.maxReconnectAttempts = options.maxReconnectAttempts || Infinity;
    this.heartbeatInterval = options.heartbeatInterval || 30000;
    this.heartbeatMessage = options.heartbeatMessage || 'ping';
    this.onMessage = options.onMessage || (() => {});
    this.onOpen = options.onOpen || (() => {});
    this.onClose = options.onClose || (() => {});
    this.onError = options.onError || (() => {});
    this.reconnectAttempts = 0;

    this.initWebSocket();
  }

  initWebSocket() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = (event) => {
      this.reconnectAttempts = 0;
      this.onOpen(event);
      this.startHeartbeat();
    };

    this.ws.onmessage = (event) => {
      this.onMessage(event.data);
    };

    this.ws.onclose = (event) => {
      console.log('WebSocket 连接关闭');
      this.onClose(event);
      this.stopHeartbeat();

      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++;
          this.initWebSocket();
        }, this.reconnectInterval);
      }
    };

    this.ws.onerror = (event) => {
      console.error('WebSocket 错误:', event);
      this.onError(event);
    };
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message = typeof data === 'object' ? JSON.stringify(data) : data;
      this.ws.send(message);
    } else {
      console.error('WebSocket 未连接，无法发送消息');
    }
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }

  startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      this.send(this.heartbeatMessage);
    }, this.heartbeatInterval);
  }

  stopHeartbeat() {
    clearInterval(this.heartbeatTimer);
  }
}

export default WebSocketClient;
