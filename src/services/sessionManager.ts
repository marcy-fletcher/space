export class SessionManager {
    private static instance: SessionManager;
    private sessionId: string = '';
    private userAgent: string = '';
    private ipAddress: string = '';

    private constructor() {
        this.initializeSession();
    }

    public static getInstance(): SessionManager {
        if (!SessionManager.instance) {
            SessionManager.instance = new SessionManager();
        }
        return SessionManager.instance;
    }

    private initializeSession(): void {
        this.sessionId = this.generateSessionId();

        this.userAgent = navigator.userAgent;

        this.getIPAddress().then(ip => {
            this.ipAddress = ip;
        });
    }

    private generateSessionId(): string {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    private async getIPAddress(): Promise<string> {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.warn('Could not fetch IP address:', error);
            return 'unknown';
        }
    }

    public getSessionData() {
        return {
            session_id: this.sessionId,
            user_agent: this.userAgent,
            ip_address: this.ipAddress
        };
    }

    public refreshSession(): void {
        this.initializeSession();
    }
}