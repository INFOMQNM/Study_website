import settings from './settings.json';
class Logger {
    constructor(logFileName = "log.txt") {
        this.logFileName = logFileName;

        // Check if logs already exist in localStorage (simulating file storage)
        if (!localStorage.getItem("logs")) {
            localStorage.setItem("logs", JSON.stringify([]));
        }
    }

    /**
     * Logs a message with a timestamp, component name, and action.
     * @param {string} componentName - The name of the component or page.
     * @param {string} action - "start" or "stop".
     */
    log(componentName, action) {
        const timestamp = new Date().toISOString();
        const control = settings.control
        const logEntry = {
            timestamp,
            componentName,
            action,
            control
        };

        // Get existing logs from localStorage
        const currentLogs = JSON.parse(localStorage.getItem("logs"));
        currentLogs.push(logEntry);

        // Save updated logs back to localStorage
        localStorage.setItem("logs", JSON.stringify(currentLogs));

        // Print to console (optional, for debugging purposes)
        console.log(`[${timestamp}] ${componentName}: ${action}`);
    }

    /**
     * Retrieves all logs.
     * @returns {Array} Array of log entries.
     */
    getLogs() {
        return JSON.parse(localStorage.getItem("logs")) || [];
    }

    /**
     * Clears all logs.
     */
    clearLogs() {
        localStorage.setItem("logs", JSON.stringify([]));
        console.log("Logs cleared.");
    }

    /**
     * Exports logs to a downloadable file in the browser.
     */
    exportLogs() {
        const logs = this.getLogs();
        const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = this.logFileName;
        link.click();
    }
}

export default Logger;