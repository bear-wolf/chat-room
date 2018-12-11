import {StompConfig} from "@stomp/ng2-stompjs";

export interface WebSocketConfig {
    url: string,
    headers: {};
    // How often to heartbeat?
    // Interval in milliseconds, set to 0 to disable
    heartbeat_in: number,
    heartbeat_out: number,
    // Wait in milliseconds before attempting auto reconnect
    // Set to 0 to disable
    // Typical value 5000 (5 seconds)
    reconnect_delay: number,
    // Will log diagnostics on console
    debug: boolean
    // options?: Options;
}